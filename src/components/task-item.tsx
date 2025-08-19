import { TTask } from "@/types/ui"


export default function TaskItem({ task }: { task: TTask }) {

    return <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border">
        <div className="flex items-center gap-3">
            <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: task.color }}
            />
            <span className="font-medium">{task.name}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
            <span className={`px-2 py-1 rounded text-xs ${task.priority === 'High' ? 'bg-red-100 text-red-800' :
                task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                }`}>
                {task.priority}
            </span>
            <span className="text-muted-foreground">{task.dueDate}</span>
        </div>
    </div>

}   