import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { getUserSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Activity } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { userAgent } from 'next/server';
import { ActivityDuration } from './duration';
import { Play, PauseIcon, ArrowRight } from 'lucide-react'

type NewActivityProps = {
  activity?: Activity | null
}


type TimeProps = {
  startAt: string,
}



const NewActivity = ({ activity }: NewActivityProps) => {

  async function startActivity(data: FormData) {
    "use server"

    const user = await getUserSession()

    await prisma.activity.create({
      data: {
        user: { connect: { id: user.id } },
        tenant: { connect: { id: user.tenant.id } },
        name: data.get('name') as string,
        startAt: new Date(),
      }
    })

    revalidatePath('/track')

  }


  async function stopActivity(data: FormData) {
    'use server'

    await prisma.activity.update({
      where: {
        id: data.get('id') as string
      },
      data: {
        endAt: new Date()
      }
    })

    revalidatePath('/track')

  }

  return (
    <div>
      <h2 className='text-lg font-bold mb-2'>What are you working on?</h2>
      <form
        action={activity ? stopActivity : startActivity}
        className=''
      >
        <div className="flex items-center space-x-4">
          <Input type='text' name="name" defaultValue={activity?.name || ''} />
          <input type="hidden" name="id" defaultValue={activity?.id || ''} />
          {activity && <><ActivityDuration startAt={activity?.startAt} /> </>}
          <Button type='submit'
            variant='ghost'
          >{activity ? <PauseIcon size={24} /> : <Play size={24} />}</Button>
        </div>
      </form>
    </div>
  );
}

type DailyActivityProps = {
  activities: Activity[]
}

const DailyActivity = ({ activities }: DailyActivityProps) => {


  return (
    <div className='mt-8'>
      <h2 className='text-lg font-bold mb-2'>What you've done today.</h2>
      <ul >
        {
          activities.map(activity => (
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
          ))
        }
      </ul>
    </div>
  )


}


export default async function TrackPage() {

  const user = await getUserSession();

  const currentActivity = await prisma.activity.findFirst({
    where: {
      tenantId: user.tenant.id,
      userId: user.id,
      endAt: null
    }
  })

  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)


  const dailyActivities = await prisma.activity.findMany({
    where: {
      tenantId: user.tenant.id,
      userId: user.id,
      OR: [
        {
          startAt: {
            equals: startOfToday
          }
        },
        {
          endAt: {
            lte: endOfToday
          }
        }
      ]
    },
    orderBy: {
      startAt: 'asc'
    }
  })



  return (
    <div className="mx-auto container py-4">
      <NewActivity activity={currentActivity} />
      <DailyActivity activities={dailyActivities} />
    </div>
  );
}