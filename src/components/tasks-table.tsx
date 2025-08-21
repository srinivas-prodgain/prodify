"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TTask } from "@/types/ui"
import { ChevronDown } from "lucide-react"



type TasksTableProps = {
    tasks: TTask[]
}

export function TasksTable({ tasks }: TasksTableProps) {
    return (
        <Table className="border-b border-gray-200">
            <TableHeader>
                <TableRow className="border-b hover:bg-transparent">
                    <TableHead className="text-[#a5a5a5] font-medium ">Name</TableHead>
                    <TableHead className="text-[#a5a5a5] font-medium text-center">Priority</TableHead>
                    <TableHead className="text-[#a5a5a5] font-medium text-right">Due date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tasks.map((task) => (
                    <TableRow key={task.id} className="border-b border-gray-200 cursor-pointer">
                        <TableCell className="py-3">
                            <div className="flex items-center gap-3">
                                <ChevronDown className="w-4 h-4" />
                                <div className="w-3 h-3 bg-[#84dacf] rounded-xs"></div>
                                <span className="font-medium text-gray-900">{task.name}</span>
                            </div>
                        </TableCell>
                        <TableCell className="py-3 text-center">
                            <span className={`px-2 py-1 rounded text-xs font-[580] ${task.priority === 'High' ? 'bg-[#ffc1c2]' :
                                task.priority === 'Medium' ? 'bg-[#f9d2b0]' :
                                    'bg-[#f2f3f7]'
                                }`}>
                                {task.priority}
                            </span>
                        </TableCell>
                        <TableCell className={`py-3 text-right text-muted-foreground ${task.dueDate === 'Today' ? 'text-[#ee4e4c]' : ''}`}>
                            {task.dueDate}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
