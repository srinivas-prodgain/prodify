"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TTask } from "@/types/ui"
import { ChevronDown } from "lucide-react"



type TasksTableProps = {
    tasks: TTask[]
}

export function TasksTable({ tasks }: TasksTableProps) {
    return (
        <Table className="border-b-[1.5px] border-gray-200">
            <TableHeader className="border-b-[1.5px] border-gray-200">
                <TableRow className="border-b-[1.5px] hover:bg-transparent">
                    <TableHead className="text-[#a5a5a5] font-medium pl-0 text-[12px]">Name</TableHead>
                    <TableHead className="text-[#a5a5a5] font-medium text-center pl-0 text-[12px]">Priority</TableHead>
                    <TableHead className="text-[#a5a5a5] font-medium text-right pr-0 text-[12px]">Due date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tasks.map((task) => (
                    <TableRow key={task.id} className="border-b-[1.5px] border-gray-200 cursor-pointer">
                        <TableCell className="py-3 pl-0">
                            <div className="flex items-center gap-2">
                                <ChevronDown className="w-4 h-4" strokeWidth={2} />
                                <div className="w-[9px] h-[9px] bg-[#84dacf] rounded-[2px]"></div>
                                <span className="font-medium text-gray-900">{task.name}</span>
                            </div>
                        </TableCell>
                        <TableCell className="text-center pl-0">
                            <span className={`p-[4px] rounded text-[10px] font-[580] ${task.priority === 'High' ? 'bg-[#ffc1c2]' :
                                task.priority === 'Medium' ? 'bg-[#f9d2b0]' :
                                    'bg-[#f2f3f7]'
                                }`}>
                                {task.priority}
                            </span>
                        </TableCell>
                        <TableCell className={`py-3 text-right text-black pr-0 ${task.dueDate === 'Today' ? 'text-[#ee4e4c]' : ''}`}>
                            {task.dueDate}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
