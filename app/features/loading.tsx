import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="flex items-center justify-center py-20">
      <Spinner className="h-6 w-6" />
    </div>
  )
}
