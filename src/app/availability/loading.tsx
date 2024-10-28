import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <section>
            <div>
                {/*<Skeleton className='h-7 w-24' />*/}
                <Skeleton className='caret-amber-200 mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' />
            </div>
        </section>
    )
}
