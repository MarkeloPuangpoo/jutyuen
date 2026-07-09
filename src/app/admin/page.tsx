import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import LoginForm from "@/components/admin/login-form";
import { logoutAdmin } from "@/actions/admin";
import CopyLinkButton from "@/components/admin/copy-link-button";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_session")?.value === "true";

  if (!isAdmin) {
    return <LoginForm />;
  }

  const supabase = await createClient();
  const { data: sessions, error } = await supabase
    .from("survey_sessions")
    .select(`
      id,
      status,
      started_at,
      completed_at,
      survey_results (
        axis,
        score
      )
    `)
    .order("started_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error(error);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
            >
              Logout
            </button>
          </form>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow ring-1 ring-black/5">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Session ID</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Started At</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Completed At</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Results</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {sessions?.map((session) => (
                  <tr key={session.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        {session.id.slice(0, 8)}...
                        <CopyLinkButton sessionId={session.id} />
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        session.status === 'completed' ? 'bg-green-50 text-green-700 ring-green-600/20' : 
                        session.status === 'abandoned' ? 'bg-red-50 text-red-700 ring-red-600/10' : 
                        'bg-yellow-50 text-yellow-800 ring-yellow-600/20'
                      }`}>
                        {session.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Date(session.started_at as string).toLocaleString('th-TH')}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {session.completed_at ? new Date(session.completed_at as string).toLocaleString('th-TH') : '-'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="flex gap-2">
                        {session.survey_results?.map((res: { axis: string; score: number }) => (
                          <span key={res.axis} className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                            {res.axis}: {res.score}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
                {(!sessions || sessions.length === 0) && (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-sm text-gray-500">
                      No sessions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
