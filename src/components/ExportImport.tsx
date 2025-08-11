import { useState } from "react"
import { Download, Upload, FileText, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import Papa from 'papaparse'
import { Resource } from "@/types/resource"
import { Group } from "@/types/group"

interface ExportImportProps {
  resources: Resource[]
  groups: Group[]
  onImportResources: (resources: Resource[]) => void
}

export function ExportImport({ resources, groups, onImportResources }: ExportImportProps) {
  const [importDialogOpen, setImportDialogOpen] = useState(false)

  const exportToPDF = () => {
    const doc = new jsPDF()
    
    // Title
    doc.setFontSize(18)
    doc.text('Study Resources Report', 20, 20)
    
    // Add current date
    doc.setFontSize(12)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30)
    
    // Prepare data for table
    const tableData = resources.map(resource => [
      resource.title,
      resource.type,
      resource.status,
      resource.priority,
      groups.find(g => g.id === resource.groupId)?.name || 'Unknown',
      resource.tags?.join(', ') || '',
      resource.timeSpent ? `${resource.timeSpent}min` : '',
      resource.createdAt.toLocaleDateString()
    ])
    
    // Add table
    autoTable(doc, {
      head: [['Title', 'Type', 'Status', 'Priority', 'Group', 'Tags', 'Time Spent', 'Created']],
      body: tableData,
      startY: 40,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [59, 130, 246] }
    })
    
    doc.save('study-resources.pdf')
    toast.success('Resources exported to PDF')
  }

  const exportToExcel = () => {
    const exportData = resources.map(resource => ({
      Title: resource.title,
      Description: resource.description || '',
      URL: resource.url || '',
      Type: resource.type,
      Status: resource.status,
      Priority: resource.priority,
      Group: groups.find(g => g.id === resource.groupId)?.name || '',
      Tags: resource.tags?.join(', ') || '',
      'Time Spent (min)': resource.timeSpent || 0,
      'Estimated Time (min)': resource.estimatedTime || 0,
      Notes: resource.notes || '',
      Rating: resource.rating || '',
      'Created Date': resource.createdAt.toLocaleDateString(),
      'Updated Date': resource.updatedAt.toLocaleDateString(),
      'Due Date': resource.dueDate?.toLocaleDateString() || ''
    }))

    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Resources')
    
    XLSX.writeFile(wb, 'study-resources.xlsx')
    toast.success('Resources exported to Excel')
  }

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const fileExtension = file.name.split('.').pop()?.toLowerCase()

    if (fileExtension === 'csv') {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          try {
            const importedResources: Resource[] = results.data.map((row: any, index: number) => ({
              id: `imported_${Date.now()}_${index}`,
              title: row.Title || row.title || 'Imported Resource',
              description: row.Description || row.description || '',
              url: row.URL || row.url || '',
              type: row.Type || row.type || 'website',
              status: row.Status || row.status || 'not-started',
              priority: row.Priority || row.priority || 'medium',
              tags: row.Tags ? row.Tags.split(',').map((t: string) => t.trim()) : [],
              groupId: '1', // Default to first group
              createdAt: new Date(),
              updatedAt: new Date(),
              timeSpent: parseInt(row['Time Spent (min)'] || row.timeSpent || '0'),
              estimatedTime: parseInt(row['Estimated Time (min)'] || row.estimatedTime || '0'),
              notes: row.Notes || row.notes || '',
              rating: parseInt(row.Rating || row.rating || '0') || undefined
            })).filter(resource => resource.title && resource.title !== '')

            onImportResources(importedResources)
            toast.success(`Imported ${importedResources.length} resources from CSV`)
            setImportDialogOpen(false)
          } catch (error) {
            toast.error('Error importing CSV file')
          }
        }
      })
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer)
          const workbook = XLSX.read(data, { type: 'array' })
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          const jsonData = XLSX.utils.sheet_to_json(worksheet)

          const importedResources: Resource[] = jsonData.map((row: any, index: number) => ({
            id: `imported_${Date.now()}_${index}`,
            title: row.Title || row.title || 'Imported Resource',
            description: row.Description || row.description || '',
            url: row.URL || row.url || '',
            type: row.Type || row.type || 'website',
            status: row.Status || row.status || 'not-started',
            priority: row.Priority || row.priority || 'medium',
            tags: row.Tags ? row.Tags.split(',').map((t: string) => t.trim()) : [],
            groupId: '1', // Default to first group
            createdAt: new Date(),
            updatedAt: new Date(),
            timeSpent: parseInt(row['Time Spent (min)'] || row.timeSpent || '0'),
            estimatedTime: parseInt(row['Estimated Time (min)'] || row.estimatedTime || '0'),
            notes: row.Notes || row.notes || '',
            rating: parseInt(row.Rating || row.rating || '0') || undefined
          })).filter(resource => resource.title && resource.title !== '')

          onImportResources(importedResources)
          toast.success(`Imported ${importedResources.length} resources from Excel`)
          setImportDialogOpen(false)
        } catch (error) {
          toast.error('Error importing Excel file')
        }
      }
      reader.readAsArrayBuffer(file)
    } else {
      toast.error('Please select a CSV or Excel file')
    }

    // Reset file input
    event.target.value = ''
  }

  return (
    <div className="flex gap-2">
      {/* Export Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-popover border border-border">
          <DropdownMenuItem onClick={exportToPDF}>
            <FileText className="mr-2 h-4 w-4" />
            Export as PDF
          </DropdownMenuItem>
          <DropdownMenuItem onClick={exportToExcel}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export as Excel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Import Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-card border border-border">
          <DialogHeader>
            <DialogTitle>Import Resources</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="file-import">
                Select CSV or Excel file to import resources
              </Label>
              <Input
                id="file-import"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileImport}
                className="mt-2"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Expected columns: Title, Description, URL, Type, Status, Priority, Tags</p>
              <p>Tags should be comma-separated. Missing columns will use default values.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}