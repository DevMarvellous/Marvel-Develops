import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface Submission {
  id: string
  created_at: string
  source: 'contact_form' | 'ai_planner'
  status: 'new' | 'contacted' | 'archived'
  full_name: string
  business_name: string | null
  email: string
  whatsapp: string | null
  industry: string | null
  service: string | null
  message: string
  details: Record<string, unknown>
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: submissions, error } = await supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <p className="font-sans text-red-600">Failed to load submissions: {error.message}</p>
  }

  const rows = (submissions ?? []) as unknown as Submission[]

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-text-dark">
        Submissions ({rows.length})
      </h1>

      <div className="rounded-xl border border-border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Name / Business</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-sans text-sm text-text-mid">
                  {new Date(row.created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge variant={row.source === 'ai_planner' ? 'secondary' : 'outline'}>
                    {row.source === 'ai_planner' ? 'AI Planner' : 'Contact Form'}
                  </Badge>
                </TableCell>
                <TableCell className="font-sans text-sm text-text-dark">
                  {row.full_name}
                  {row.business_name && <span className="text-text-mid"> · {row.business_name}</span>}
                </TableCell>
                <TableCell className="font-sans text-sm text-text-mid">{row.email}</TableCell>
                <TableCell className="font-sans text-sm text-text-mid">{row.service ?? '—'}</TableCell>
                <TableCell>
                  <Badge variant="outline">{row.status}</Badge>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="font-sans text-sm font-semibold text-royal-blue hover:underline">
                        View
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{row.full_name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3 font-sans text-sm">
                        <p><span className="font-semibold">Email:</span> {row.email}</p>
                        {row.whatsapp && <p><span className="font-semibold">WhatsApp:</span> {row.whatsapp}</p>}
                        {row.industry && <p><span className="font-semibold">Industry:</span> {row.industry}</p>}
                        {row.service && <p><span className="font-semibold">Service:</span> {row.service}</p>}
                        <div>
                          <p className="mb-1 font-semibold">Message</p>
                          <p className="whitespace-pre-wrap text-text-mid">{row.message}</p>
                        </div>
                        {Object.keys(row.details ?? {}).length > 0 && (
                          <div>
                            <p className="mb-1 font-semibold">Planner details</p>
                            <pre className="overflow-x-auto rounded-lg bg-gray-white p-3 text-xs text-text-mid">
                              {JSON.stringify(row.details, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
