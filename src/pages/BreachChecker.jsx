import { useState } from 'react'

function BreachChecker({ onBack }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const checkBreach = async () => {
    if (!email.trim()) {
      alert('Please enter an email address')
      return
    }

    // Validate email
    if (!email.includes('@')) {
      alert('Please enter a valid email address')
      return
    }

    setLoading(true)
    try {
      // Try using CORS proxy to bypass CORS restrictions
      const corsProxy = 'https://api.allorigins.win/raw?url='
      const apiUrl = `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}`
      
      const response = await fetch(corsProxy + encodeURIComponent(apiUrl), {
        headers: {
          'User-Agent': 'CyberSecureToolkit'
        }
      })

      if (response.ok) {
        try {
          const breaches = await response.json()
          if (Array.isArray(breaches) && breaches.length > 0) {
            setResult({
              email,
              breached: true,
              message: `This email was found in ${breaches.length} data breach(es).`,
              breaches,
              isReal: true
            })
          } else {
            setResult({
              email,
              breached: false,
              message: 'Good news! This email was not found in any known data breaches.',
              breaches: [],
              isReal: true
            })
          }
        } catch {
          // Response isn't JSON, try direct check
          checkDirectBreach()
        }
      } else {
        checkDirectBreach()
      }
    } catch (error) {
      checkDirectBreach()
    }
  }

  const checkDirectBreach = async () => {
    try {
      // Direct API call - may fail due to CORS but attempt anyway
      const response = await fetch(
        `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}`,
        {
          headers: {
            'User-Agent': 'CyberSecureToolkit'
          }
        }
      )

      if (response.status === 404) {
        setResult({
          email,
          breached: false,
          message: 'Good news! This email was not found in any known data breaches.',
          breaches: [],
          isReal: true
        })
      } else if (response.status === 200) {
        const breaches = await response.json()
        setResult({
          email,
          breached: true,
          message: `This email was found in ${breaches.length} data breach(es).`,
          breaches,
          isReal: true
        })
      } else if (response.status === 429) {
        // Rate limited
        simulateRealWorldBreach()
      } else {
        simulateRealWorldBreach()
      }
    } catch (error) {
      // Fall back to demo with real-world-like data
      simulateRealWorldBreach()
    }
    setLoading(false)
  }

  const simulateRealWorldBreach = () => {
    // Real-world common breaches from HaveIBeenPwned
    const knownBreaches = [
      { Name: 'LinkedIn', BreachDate: '2021-04-09', PwnCount: 700605709, Title: 'LinkedIn suffered a data breach' },
      { Name: 'Facebook', BreachDate: '2021-04-03', PwnCount: 533000000, Title: 'Facebook suffered a data breach' },
      { Name: 'Twitter', BreachDate: '2020-12-17', PwnCount: 200000000, Title: 'Twitter suffered a data breach' },
      { Name: 'Yahoo', BreachDate: '2013-04-24', PwnCount: 3000000000, Title: 'Yahoo suffered a massive data breach' },
      { Name: 'Adobe', BreachDate: '2013-10-04', PwnCount: 153000000, Title: 'Adobe suffered a data breach' },
      { Name: 'Equifax', BreachDate: '2017-09-07', PwnCount: 147000000, Title: 'Equifax suffered a data breach' },
      { Name: 'Uber', BreachDate: '2016-11-14', PwnCount: 57000000, Title: 'Uber suffered a data breach' },
      { Name: 'Dropbox', BreachDate: '2012-07-01', PwnCount: 68000000, Title: 'Dropbox suffered a data breach' },
      { Name: 'Myspace', BreachDate: '2008-06-11', PwnCount: 360000000, Title: 'Myspace suffered a data breach' },
      { Name: 'Ashleymadison', BreachDate: '2015-08-18', PwnCount: 37000000, Title: 'Ashley Madison suffered a data breach' },
    ]

    // Simulate check - vary results based on email domain for demo
    const emailDomain = email.split('@')[1]
    const seed = emailDomain.charCodeAt(0) + emailDomain.length
    const shouldBreach = (seed % 3) !== 0 // 66% chance of breach in demo

    if (shouldBreach) {
      const numBreaches = Math.floor((seed % 5) + 1) // 1-5 breaches
      const selectedBreaches = knownBreaches.slice(0, numBreaches)

      setResult({
        email,
        breached: true,
        message: `This email was found in ${numBreaches} data breach(es).`,
        breaches: selectedBreaches,
        isDemo: true
      })
    } else {
      setResult({
        email,
        breached: false,
        message: 'Good news! This email was not found in any known data breaches.',
        breaches: [],
        isDemo: true
      })
    }
    setLoading(false)
  }

  return (
    <div className="w-full min-h-screen bg-terminal-black overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-terminal-green/20 px-4 sm:px-6 py-3 sm:py-4">
        <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold">🚨 Breach Checker</h1>
          <button
            onClick={onBack}
            className="text-terminal-cyan hover:text-terminal-green transition text-xs sm:text-sm w-fit"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="border border-terminal-green/20 rounded p-4 sm:p-8 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Check if Your Email is Breached</h2>
          <p className="text-terminal-cyan text-xs sm:text-sm mb-4 sm:mb-6">
            Enter your email address to check if it has appeared in any known data breaches. 
            This tool helps you identify compromised accounts so you can take action.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkBreach()}
              placeholder="your@email.com"
              className="flex-1 px-3 sm:px-4 py-2 bg-terminal-dark border border-terminal-green/20 rounded text-terminal-green placeholder-terminal-green/40 outline-none focus:border-terminal-green/50 text-xs sm:text-base"
            />
            <button
              onClick={checkBreach}
              disabled={loading}
              className="border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black disabled:opacity-50 disabled:cursor-not-allowed px-4 sm:px-6 py-2 rounded transition-colors text-xs sm:text-sm whitespace-nowrap"
            >
              {loading ? 'Checking...' : 'Check'}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-4 sm:space-y-6">
            {/* Status */}
            <div className={`border rounded p-4 sm:p-6 ${
              result.breached === false ? 'border-terminal-green bg-terminal-dark' :
              result.breached === true ? 'border-terminal-red bg-terminal-dark' :
              'border-terminal-yellow bg-terminal-dark'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl">
                  {result.breached === false ? '✓' : result.breached === true ? '⚠' : '❌'}
                </span>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold">
                    {result.breached === false
                      ? 'Not Found in Breaches'
                      : result.breached === true
                      ? 'Found in Breaches'
                      : 'Error'}
                  </h3>
                  <p className="text-xs sm:text-sm text-terminal-cyan">{result.email}</p>
                </div>
              </div>
              <p className="text-terminal-cyan text-xs sm:text-sm">{result.message}</p>
              {result.isDemo && (
                <p className="text-xs text-terminal-green/50 mt-3 sm:mt-4">
                  (Demo mode: Using simulated data for demonstration)
                </p>
              )}
            </div>

            {/* Breaches List */}
            {result.breached && result.breaches.length > 0 && (
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-bold">Data Breaches Found ({result.breaches.length}):</h3>
                {result.breaches.map((breach, idx) => (
                  <div key={idx} className="border border-terminal-red/30 rounded p-3 sm:p-4 bg-terminal-dark">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-2 sm:mb-3">
                      <h4 className="font-bold text-terminal-red text-sm sm:text-base">{breach.Name}</h4>
                      <span className="text-xs text-terminal-yellow">
                        {new Date(breach.BreachDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-terminal-cyan mb-2">
                      💾 {(breach.PwnCount?.toLocaleString() || 'Unknown')} accounts affected
                    </p>
                    <p className="text-xs text-terminal-green/60">
                      {breach.Title || 'Security incident detected'}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="border border-terminal-green/20 rounded p-4 sm:p-6 bg-terminal-dark">
              <h3 className="font-bold mb-3 sm:mb-4 text-terminal-cyan text-sm sm:text-base">What You Should Do:</h3>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                {result.breached && result.breaches.length > 0 ? (
                  <>
                    <li className="text-terminal-red">⚠ Change your password immediately</li>
                    <li className="text-terminal-green">• Use a strong, unique password (16+ characters with mixed case)</li>
                    <li className="text-terminal-green">• Enable two-factor authentication (2FA)</li>
                    <li className="text-terminal-green">• Check other accounts using the same password</li>
                    <li className="text-terminal-green">• Monitor your account for suspicious activity</li>
                    <li className="text-terminal-green">• Consider a credit freeze if financial data was exposed</li>
                  </>
                ) : (
                  <>
                    <li className="text-terminal-green">✓ Your email appears to be safe</li>
                    <li className="text-terminal-green">• Continue using strong passwords</li>
                    <li className="text-terminal-green">• Enable two-factor authentication</li>
                    <li className="text-terminal-green">• Regularly check for new breaches</li>
                  </>
                )}
              </ul>
            </div>

            {result.isDemo && (
              <div className="border border-terminal-yellow/30 rounded p-3 sm:p-4 bg-terminal-dark">
                <p className="text-xs text-terminal-yellow">
                  ℹ Using simulated data (API rate limit or demo mode). For real-time checks, visit haveibeenpwned.com
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default BreachChecker
