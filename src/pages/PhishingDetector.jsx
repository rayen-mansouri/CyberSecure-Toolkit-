import { useState } from 'react'

function PhishingDetector({ onBack }) {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState(null)

  const analyzeUrl = () => {
    if (!url.trim()) {
      alert('Please enter a URL')
      return
    }

    let score = 0
    const warnings = []
    const safe = []

    try {
      const urlObj = new URL(url)
      const domain = urlObj.hostname.toLowerCase()
      const protocol = urlObj.protocol
      const pathname = urlObj.pathname
      const search = urlObj.search

      // 1. Protocol check
      if (protocol !== 'https:') {
        warnings.push('❌ Not using HTTPS - connection is NOT encrypted')
        score += 25
      } else {
        safe.push('✓ Using secure HTTPS encryption')
      }

      // 2. Domain reputation checks
      const suspiciousDomains = [
        'paypal', 'amazon', 'apple', 'google', 'microsoft', 'bank', 'security', 
        'verify', 'confirm', 'update', 'validate', 'authenticate', 'facebook', 
        'instagram', 'twitter', 'linkedin', 'wells', 'chase', 'discover'
      ]

      let isSuspiciousDomain = false
      const parts = domain.split('.')
      const mainDomain = parts[parts.length - 2] + '.' + parts[parts.length - 1]

      for (const keyword of suspiciousDomains) {
        // Check if domain contains keyword but ISN'T the real service
        if (domain.includes(keyword) && !domain.endsWith(keyword + '.com') && !domain.endsWith(keyword + '.org')) {
          isSuspiciousDomain = true
          warnings.push(`⚠ Domain mimics "${keyword}" but uses different domain`)
          score += 35
          break
        }
      }

      if (!isSuspiciousDomain) {
        safe.push('✓ Domain does not mimic well-known services')
      }

      // 3. IP address check
      if (/^\d+\.\d+\.\d+\.\d+/.test(domain)) {
        warnings.push('❌ URL uses raw IP address instead of domain name - major red flag')
        score += 40
      } else {
        safe.push('✓ URL uses proper domain name, not IP address')
      }

      // 4. Subdomain check - too many subdomains is suspicious
      const subdomainCount = domain.split('.').length
      if (subdomainCount > 4) {
        warnings.push(`⚠ Excessive subdomains (${subdomainCount}) - unusual structure`)
        score += 20
      }

      if (subdomainCount <= 3) {
        safe.push('✓ Standard domain structure')
      }

      // 5. Domain characters check
      if (/[àáâãäåæçèéêëìíîïñòóôõöøùúûüýÿ]/.test(domain)) {
        warnings.push('⚠ Domain contains non-ASCII characters - possible IDN spoofing')
        score += 30
      }

      // 6. Hyphens check
      const hyphenCount = (domain.match(/-/g) || []).length
      if (hyphenCount > 2) {
        warnings.push('⚠ Multiple hyphens in domain - possible domain spoofing')
        score += 15
      }

      // 7. Suspicious path/query parameters
      const suspiciousParams = [
        'verify', 'confirm', 'update', 'login', 'secure', 'validate', 
        'authenticate', 'account', 'payment', 'billing', 'reset', 'activate'
      ]

      let hasSuspiciousParam = false
      for (const param of suspiciousParams) {
        if (pathname.toLowerCase().includes(param) || search.toLowerCase().includes(param)) {
          hasSuspiciousParam = true
          warnings.push(`⚠ URL contains suspicious parameter: "${param}"`)
          score += 20
          break
        }
      }

      // 8. URL length check
      if (url.length > 150) {
        warnings.push('⚠ Unusually long URL - may hide malicious parameters')
        score += 15
      }

      if (url.length <= 100) {
        safe.push('✓ URL length is reasonable')
      }

      // 9. Port check
      if (urlObj.port && !['80', '443', '8080', '8443'].includes(urlObj.port)) {
        warnings.push(`⚠ Non-standard port ${urlObj.port} - unusual but not necessarily malicious`)
        score += 10
      }

      // 10. Domain age heuristic (we can't check real age, but we can check for new-looking domains)
      if (/\d{4,}/.test(domain.split('.')[0])) {
        warnings.push('⚠ Domain contains many numbers - may be randomly generated')
        score += 15
      }

      // If no warnings, add generic safety message
      if (warnings.length === 0) {
        safe.push('✓ No major phishing indicators detected')
        safe.push('✓ Domain structure appears legitimate')
        score = 5
      }

      const threat = score <= 25 ? 'Safe' : score <= 60 ? 'Suspicious' : 'Dangerous'

      setResult({
        url,
        threat,
        score: Math.min(score, 100),
        warnings,
        safe
      })
    } catch (e) {
      setResult({
        url,
        threat: 'Invalid',
        error: 'Invalid URL format. Please enter a valid URL (e.g., https://example.com)',
        score: 0,
        warnings: [],
        safe: []
      })
    }
  }

  return (
    <div className="w-full min-h-screen bg-terminal-black overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-terminal-green/20 px-4 sm:px-6 py-3 sm:py-4">
        <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold">🎣 Phishing Detector</h1>
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
          <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Check if a URL is Safe</h2>
          <p className="text-terminal-cyan text-xs sm:text-sm mb-4 sm:mb-6">
            Paste a suspicious URL below to analyze it for phishing indicators, malware risks, 
            and other security threats.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && analyzeUrl()}
              placeholder="https://example.com"
              className="flex-1 px-3 sm:px-4 py-2 bg-terminal-dark border border-terminal-green/20 rounded text-terminal-green placeholder-terminal-green/40 outline-none focus:border-terminal-green/50 text-xs sm:text-base"
            />
            <button
              onClick={analyzeUrl}
              className="border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black px-4 sm:px-6 py-2 rounded transition-colors text-xs sm:text-sm whitespace-nowrap"
            >
              Analyze
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-4 sm:space-y-6">
            {/* Threat Level */}
            <div className={`border rounded p-4 sm:p-6 ${
              result.threat === 'Safe' ? 'border-terminal-green bg-terminal-dark' :
              result.threat === 'Suspicious' ? 'border-terminal-yellow bg-terminal-dark' :
              result.error ? 'border-terminal-red bg-terminal-dark' :
              'border-terminal-red bg-terminal-dark'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-bold">
                  {result.threat === 'Safe' ? '✓' : '⚠'} {result.threat || 'Analysis'}
                </h3>
                <span className={`text-xs sm:text-sm font-bold ${
                  result.threat === 'Safe' ? 'text-terminal-green' :
                  result.threat === 'Suspicious' ? 'text-terminal-yellow' :
                  'text-terminal-red'
                }`}>
                  Risk: {result.score}%
                </span>
              </div>

              {result.error ? (
                <p className="text-terminal-cyan text-xs sm:text-sm">{result.error}</p>
              ) : (
                <>
                  {/* Risk Bar */}
                  <div className="mb-4 sm:mb-6">
                    <div className="w-full bg-terminal-darker border border-terminal-green/20 rounded h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          result.score <= 20
                            ? 'bg-terminal-green'
                            : result.score <= 50
                            ? 'bg-terminal-yellow'
                            : 'bg-terminal-red'
                        }`}
                        style={{ width: `${result.score}%` }}
                      />
                    </div>
                  </div>

                  {/* Warnings */}
                  {result.warnings.length > 0 && (
                    <div className="mb-4 sm:mb-6">
                      <p className="text-xs sm:text-sm text-terminal-yellow mb-2 sm:mb-3 font-bold">⚠ Detected Issues:</p>
                      <ul className="space-y-1 sm:space-y-2">
                        {result.warnings.map((warning, idx) => (
                          <li key={idx} className="text-xs sm:text-sm text-terminal-cyan">
                            • {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Safe Indicators */}
                  {result.safe.length > 0 && (
                    <div>
                      <p className="text-xs sm:text-sm text-terminal-green mb-2 sm:mb-3 font-bold">✓ Positive Indicators:</p>
                      <ul className="space-y-1 sm:space-y-2">
                        {result.safe.map((item, idx) => (
                          <li key={idx} className="text-xs sm:text-sm text-terminal-green">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Recommendation */}
            <div className="border border-terminal-green/20 rounded p-4 sm:p-6 bg-terminal-dark">
              <p className="text-xs sm:text-sm text-terminal-cyan">
                <strong>Recommendation:</strong>{' '}
                {result.threat === 'Safe'
                  ? 'This URL appears safe. However, always verify links from unexpected sources.'
                  : result.threat === 'Suspicious'
                  ? 'Exercise caution with this URL. Avoid clicking if you were not expecting it.'
                  : result.threat === 'Dangerous'
                  ? 'DO NOT click this link. It shows multiple phishing indicators. Report it if received in email.'
                  : 'Unable to analyze. Please check the URL format.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PhishingDetector
