'use client'

import { pad } from "@/lib/utils"
import { useEffect, useState } from "react"

type Props = {
    startAt: Date,
}




export const ActivityDuration = ({ startAt }: Props) => {
    const [elapsed, setElapsed] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date()
            const elpsed = now.getTime() - startAt.getTime()
            setElapsed(elpsed)
        }, 1000)

        return () => clearInterval(interval)
    })

    const hours = Math.floor(elapsed / 1000 / 60 / 60)
    const minutes = Math.floor((elapsed / 1000 / 60) % 60)
    const seconds = Math.floor((elapsed / 1000) % 60)


    return (
        <div className="slashed-zero tabular-nums bg-gray-200 rounded p-1 font-medium">
            {pad(hours)}:{pad(minutes)}:{pad(seconds)}
        </div>
    )
}