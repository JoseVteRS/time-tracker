'use client'

import { Input } from "@/components/ui/input"
import { Activity } from "@prisma/client"
import { ArrowRight, Calendar } from "lucide-react"
import { useState } from "react"
import { updateActivity } from "./actions"
import { Button } from "@/components/ui/button"
import { pad } from "@/lib/utils"


type Props = {
    activity: Activity,
}

type EditNameProps = {
    name?: string,
    value: Date,
    onChange?: (date: Date) => void,
}

const EditDateTime = ({ name, value, onChange }: EditNameProps) => {
    const [date, setDate] = useState(value)

    return (
        <div>
            <div className="relative flex items-center">
                <input type="hidden" name={name} value={date.toDateString()} />
                <Input
                    className="pr-8"
                    type="time"
                    name="time"
                    value={`${pad(date.getHours())}:${pad(date.getMinutes())}`}
                    onChange={(event) => {
                        const [hours, minutes] = event.target.value.split(':')
                        const newDate = new Date(date)
                        newDate.setHours(parseInt(hours) || 0)
                        newDate.setMinutes(parseInt(minutes) || 0)
                        setDate(newDate)
                        onChange && onChange(newDate)
                    }}
                />
                <Calendar size={16} className="absolute right-2" />
            </div>
        </div>
    )
}





type EditItemRowprops = {
    activity: Activity,
    onSave: () => void,
}

const EditItemRow = ({ activity, onSave }: EditItemRowprops) => {
    return (
        <li key={activity.id} className='py-2 space-x-2 flex items-center' >

            <form action={async (data) => {
                await updateActivity(data)
                onSave()
            }}
                className="flex items-center space-x-2"
            >
                <Input className="w-[300px]" type="text" name="name" defaultValue={activity.name || ''} />
                <EditDateTime name="startAt" value={activity.startAt} />
                <EditDateTime name="endAt" value={activity.endAt || new Date()} />
                <Button type="submit">Save</Button>
            </form>
        </li>

    )
}

const ReadItemRow = ({ activity }: Props) => {
    return (
        <li key={activity.id} className='py-2 space-x-2 flex items-center' >

            <span className='w-1/3'>{activity.name}</span>

            <div className='flex gap-2 items-center'>
                <span>
                    {
                        new Intl.DateTimeFormat(undefined, {
                            hour: 'numeric',
                            minute: 'numeric',
                        }).format(activity.startAt)
                    }
                </span>

                <ArrowRight />

                <span>
                    {
                        new Intl.DateTimeFormat(undefined, {
                            hour: 'numeric',
                            minute: 'numeric',
                        }).format(activity.endAt || new Date())
                    }
                </span>

            </div>
        </li>
    )
}



export const ActivityItemRow = ({ activity }: Props) => {

    const [isEditing, setIsEditing] = useState(false)

    return isEditing
        ? <EditItemRow activity={activity} onSave={() => setIsEditing(false)} />
        : (
            <>

                <ReadItemRow activity={activity} />
                <button onClick={() => setIsEditing(true)}>Edit</button>

            </>
        )
}
