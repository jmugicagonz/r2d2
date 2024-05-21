export function SummaryCard({ summary }: {summary: string}) {
    return (
        <div className="pb-10">
            <div className="w-full rounded-lg bg-gray-200/25 p-4">
                {summary}
            </div>
        </div>
    )
}