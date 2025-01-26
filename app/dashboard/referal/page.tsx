export default function ReferralPage() {
    return (
      <div className="min-h-[70vh] relative flex items-center justify-center p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-purple-500/10 backdrop-blur-sm z-10"></div>
        <div className="relative z-20 max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-12 rounded-2xl border border-orange-500/20 shadow-xl shadow-orange-500/10">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent animate-pulse">
              Referral Program
            </h1>
            <div className="mt-8 space-y-4">
              <p className="text-3xl font-semibold text-slate-200">
                Coming Soon
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Our referral program is under development. Get ready to earn amazing rewards by inviting your friends to join our platform!
              </p>
              <div className="mt-8 p-6 bg-orange-500/10 rounded-xl">
                <p className="text-orange-400 font-medium">
                  🎁 Exclusive rewards
                  <span className="mx-4">•</span>
                  💰 Commission earnings
                  <span className="mx-4">•</span>
                  🚀 Special bonuses
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

