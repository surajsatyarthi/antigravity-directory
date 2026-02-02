import { auth } from '@/auth';
import { db } from '@/lib/db';
import { users } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { MarketplaceHeader } from '@/components/MarketplaceHeader';
import { Footer } from '@/components/Footer';
import { ResourceCard } from '@/components/ResourceCard';
import { 
  ShieldCheck, Zap, BarChart3, Users, 
  Package, Clock, CheckCircle2, AlertCircle,
  TrendingUp, ExternalLink, Settings, DollarSign
} from 'lucide-react';
import { getOwnerDashboardData, getAdminDashboardData } from '@/lib/queries';
import { getEdwardProspects } from '@/lib/edward';
import dynamic from 'next/dynamic';

const EdwardOutreachPanel = dynamic(() => import('@/components/EdwardOutreachPanel').then(mod => mod.EdwardOutreachPanel), {
  loading: () => <div className="h-64 w-full animate-pulse bg-white/5 rounded-xl" />,
  ssr: true
});
import Link from 'next/link';
import { Mail } from 'lucide-react';

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/auth/signin');
  }

  const userId = session.user.id;
  const user = (await db.select().from(users).where(eq(users.id, userId)).limit(1))[0];
  const isAdmin = user?.role === 'ADMIN';

  const ownerData = await getOwnerDashboardData(userId);
  const adminData = isAdmin ? await getAdminDashboardData() : null;
  const edwardProspects = isAdmin ? await getEdwardProspects(5) : [];

  return (
    <div className="min-h-screen bg-black flex flex-col selection:bg-blue-500/30">
      <MarketplaceHeader />

      <main className="container mx-auto px-4 py-16 flex-1 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                isAdmin ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                {isAdmin ? 'System Administrator' : 'Verified Tool Owner'}
              </span>
              <span className="text-gray-800">/</span>
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{user?.username}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-tight">
              Control <span className={isAdmin ? 'text-blue-500' : 'text-emerald-500'}>Center</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
             {isAdmin && (
               <Link href="/settings" className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                  <Settings className="w-5 h-5 text-gray-400" />
               </Link>
             )}
          </div>
        </div>

        {/* ADMIN VIEW */}
        {isAdmin && adminData && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Admin Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Users', val: adminData.stats.totalUsers, icon: Users, color: 'blue' },
                { label: 'Published Tools', val: adminData.stats.totalResources, icon: Package, color: 'emerald' },
                { label: 'Pending Vetting', val: adminData.stats.pendingSubmissions, icon: Clock, color: 'yellow' },
                { label: 'Active Queue', val: adminData.stats.vettingResources, icon: TrendingUp, color: 'purple' },
              ].map((stat, i) => (
                <div key={i} className="bg-[#050505] border border-white/[0.05] rounded-3xl p-6 relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity`}>
                    <stat.icon className="w-16 h-16" />
                  </div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">{stat.label}</p>
                  <p className="text-4xl font-black text-white">{stat.val}</p>
                </div>
              ))}
            </div>

            {/* Admin Action Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-[#050505] border border-white/[0.05] rounded-3xl p-8">
                <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                   <Zap className="w-5 h-5 text-blue-500" /> Recent Submissions
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="pb-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">Resource</th>
                        <th className="pb-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">Type</th>
                        <th className="pb-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">Status</th>
                        <th className="pb-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03]">
                      {adminData.recentSubmissions.map((sub) => (
                        <tr key={sub.id} className="group hover:bg-white/[0.01] transition-colors">
                          <td className="py-4">
                            <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{sub.title}</p>
                            <p className="text-[10px] text-gray-600 font-mono">{new Date(sub.createdAt).toLocaleDateString()}</p>
                          </td>
                          <td className="py-4">
                             <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                               sub.paymentType === 'FEATURED' ? 'bg-blue-500/10 text-blue-400' : 'bg-white/5 text-gray-400'
                             }`}>
                               {sub.paymentType}
                             </span>
                          </td>
                          <td className="py-4">
                             <span className={`text-[9px] font-black uppercase tracking-widest ${
                               sub.paymentStatus === 'PAID' ? 'text-emerald-500' : 'text-gray-600'
                             }`}>
                               {sub.paymentStatus}
                             </span>
                          </td>
                          <td className="py-4">
                             <button className="text-[10px] font-black text-white hover:text-blue-500 uppercase tracking-widest transition-colors">
                               Approve →
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-3xl p-8 relative overflow-hidden">
                 <div className="absolute -right-4 -bottom-4 opacity-10">
                    <DollarSign className="w-32 h-32 text-blue-500" />
                 </div>
                 <h3 className="text-xl font-black mb-6">Revenue Stats</h3>
                 <div className="space-y-6">
                    <div>
                       <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Est. Gross MRR</p>
                       <p className="text-3xl font-black text-white">$4,260</p>
                    </div>
                </div>
              </div>
            </div>

            {/* Edward Intelligence Section */}
            <EdwardOutreachPanel prospects={edwardProspects} />
          </div>
        )}

        {/* OWNER VIEW */}
        {!isAdmin && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Owner Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Listed Tools', val: ownerData.stats.toolCount || 0, icon: Package, color: 'emerald' },
                { label: 'Total Traffic', val: ownerData.stats.totalViews || 0, icon: BarChart3, color: 'blue' },
                { label: 'Founding Rank', val: '#12', icon: ShieldCheck, color: 'yellow' },
              ].map((stat, i) => (
                <div key={i} className="bg-[#050505] border border-white/[0.05] rounded-3xl p-8 relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity`}>
                    <stat.icon className="w-16 h-16 text-emerald-500" />
                  </div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">{stat.label}</p>
                  <p className="text-5xl font-black text-white">{stat.val}</p>
                </div>
              ))}
            </div>

            {/* My Tools Section */}
            <div>
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-black tracking-tighter text-white uppercase italic flex items-center gap-3">
                   <div className="w-1.5 h-6 bg-emerald-600 rounded-full" /> My Resources
                </h2>
                <Link href="/submit" className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-4 py-2 rounded-lg hover:bg-emerald-500/20 transition-all">
                   Submit New Tool +
                </Link>
              </div>

              {ownerData.tools.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ownerData.tools.map((tool) => (
                    <div key={tool.id} className="relative group">
                       {tool.status === 'VETTING' && (
                         <div className="absolute top-4 left-4 z-40">
                           <span className="flex items-center gap-1.5 px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-md text-[8px] font-black text-yellow-500 uppercase tracking-widest backdrop-blur-md">
                             <Clock className="w-3 h-3" /> Under Review
                           </span>
                         </div>
                       )}
                       <ResourceCard resource={tool as any} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-24 bg-[#050505] border border-white/[0.05] border-dashed rounded-[32px] text-center max-w-2xl mx-auto">
                  <Package className="w-12 h-12 text-gray-800 mx-auto mb-6 opacity-20" />
                  <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.2em] mb-8">No verified tools found in this sector.</p>
                  <Link href="/submit" className="inline-flex px-10 py-4 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-500 transition-all uppercase tracking-widest text-[11px] shadow-xl shadow-emerald-500/20">
                    Claim Your First Listing
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
