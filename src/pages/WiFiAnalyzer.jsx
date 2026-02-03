import { useState } from 'react'

function WiFiAnalyzer({ onBack }) {
  const [ssid, setSSID] = useState('')
  const [encryption, setEncryption] = useState('')
  const [channel, setChannel] = useState('')
  const [signalStrength, setSignalStrength] = useState('')
  const [result, setResult] = useState(null)

  const encryptionTypes = {
    'Open': { security: 'Critical', color: 'terminal-red', description: 'No encryption - completely vulnerable' },
    'WEP': { security: 'Critical', color: 'terminal-red', description: 'Outdated and easily cracked' },
    'WPA': { security: 'Poor', color: 'terminal-red', description: 'Outdated, vulnerable to attacks' },
    'WPA2': { security: 'Good', color: 'terminal-cyan', description: 'Current standard, reasonably secure' },
    'WPA3': { security: 'Excellent', color: 'terminal-green', description: 'Latest standard, highly secure' },
    'Unknown': { security: 'Unknown', color: 'terminal-yellow', description: 'Unable to determine encryption' }
  }

  const analyzeWiFi = () => {
    if (!ssid || !encryption) {
      alert('Please fill in SSID and encryption type')
      return
    }

    let score = 0
    const warnings = []
    const safe = []

    // 1. Encryption check
    const encryptionInfo = encryptionTypes[encryption] || encryptionTypes['Unknown']
    
    if (encryption === 'Open') {
      warnings.push('❌ CRITICAL: No encryption - network is completely exposed')
      score += 60
    } else if (encryption === 'WEP') {
      warnings.push('❌ CRITICAL: WEP is outdated and can be cracked in minutes')
      score += 55
    } else if (encryption === 'WPA') {
      warnings.push('⚠ WARNING: WPA is outdated - upgrade to WPA2/WPA3')
      score += 35
    } else if (encryption === 'WPA2') {
      safe.push('✓ WPA2 provides good security')
      score += 10
    } else if (encryption === 'WPA3') {
      safe.push('✓ WPA3 is the latest and most secure standard')
      score += 0
    }

    // 2. SSID analysis
    const ssidLower = ssid.toLowerCase()
    
    if (ssid === 'admin' || ssid === 'default' || ssid === 'TP-Link' || ssid === 'linksys') {
      warnings.push('⚠ Default SSID - router uses manufacturer default settings')
      score += 15
    } else if (ssid.includes('Guest') || ssid.includes('Public')) {
      warnings.push('⚠ Guest/Public WiFi - be cautious with sensitive data')
      score += 20
    } else if (ssid.length < 8) {
      warnings.push('⚠ Short SSID name - easier to target')
      score += 10
    } else {
      safe.push('✓ Custom SSID name is good practice')
    }

    // 3. Hidden SSID
    if (ssid === 'Hidden' || ssid.includes('[Hidden]')) {
      warnings.push('ℹ SSID is hidden - provides obscurity but can be discovered')
      score += 5
    }

    // 4. Channel analysis
    if (channel) {
      const channelNum = parseInt(channel)
      const goodChannels = [1, 6, 11] // Non-overlapping 2.4GHz channels
      
      if (!goodChannels.includes(channelNum) && channelNum <= 13) {
        warnings.push(`⚠ Channel ${channelNum} overlaps with others - can cause interference`)
        score += 10
      } else if (goodChannels.includes(channelNum)) {
        safe.push(`✓ Channel ${channelNum} is optimal (non-overlapping)`)
      } else if (channelNum > 13) {
        safe.push('✓ 5GHz channel - less interference than 2.4GHz')
      }
    }

    // 5. Signal strength
    if (signalStrength) {
      const signal = parseInt(signalStrength)
      if (signal >= -70) {
        safe.push(`✓ Strong signal (${signal}dBm)`)
      } else if (signal >= -80) {
        safe.push(`⚠ Moderate signal (${signal}dBm) - may have dead zones`)
      } else {
        warnings.push(`⚠ Weak signal (${signal}dBm) - poor coverage`)
        score += 5
      }
    }

    // General recommendations
    if (score === 0) {
      safe.push('✓ WiFi security configuration is excellent')
    }

    const securityLevel = 
      score <= 10 ? 'Excellent' :
      score <= 30 ? 'Good' :
      score <= 50 ? 'Fair' :
      'Poor'

    setResult({
      ssid,
      encryption,
      channel: channel || 'Not specified',
      signalStrength: signalStrength ? `${signalStrength}dBm` : 'Not specified',
      securityLevel,
      score: Math.min(score, 100),
      warnings,
      safe,
      encryptionInfo,
      analyzedAt: new Date().toLocaleString()
    })
  }

  return (
    <div className="min-h-screen bg-terminal-black">
      {/* Header */}
      <div className="border-b border-terminal-green/20 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">📡 WiFi Security Analyzer</h1>
          <button
            onClick={onBack}
            className="text-terminal-cyan hover:text-terminal-green transition text-sm"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="border border-terminal-green/20 rounded p-8 mb-8">
          <h2 className="text-xl font-bold mb-6">Analyze Your WiFi Network</h2>
          <p className="text-terminal-cyan text-sm mb-8">
            Enter your WiFi network details to get a security assessment. Check your router settings 
            to find this information (usually on a sticker or in the admin panel).
          </p>

          <div className="space-y-4">
            {/* SSID Input */}
            <div>
              <label className="text-sm text-terminal-cyan mb-2 block">Network Name (SSID)</label>
              <input
                type="text"
                value={ssid}
                onChange={(e) => setSSID(e.target.value)}
                placeholder="e.g., MyHomeWiFi"
                className="w-full px-4 py-2 bg-terminal-dark border border-terminal-green/20 rounded text-terminal-green placeholder-terminal-green/40 outline-none focus:border-terminal-green/50"
              />
            </div>

            {/* Encryption Input */}
            <div>
              <label className="text-sm text-terminal-cyan mb-2 block">Encryption Type</label>
              <select
                value={encryption}
                onChange={(e) => setEncryption(e.target.value)}
                className="w-full px-4 py-2 bg-terminal-dark border border-terminal-green/20 rounded text-terminal-green outline-none focus:border-terminal-green/50"
              >
                <option value="">Select encryption type...</option>
                <option value="Open">Open (No encryption)</option>
                <option value="WEP">WEP</option>
                <option value="WPA">WPA</option>
                <option value="WPA2">WPA2</option>
                <option value="WPA3">WPA3</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            {/* Channel Input */}
            <div>
              <label className="text-sm text-terminal-cyan mb-2 block">WiFi Channel (optional)</label>
              <input
                type="number"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                placeholder="e.g., 6 (2.4GHz) or 36 (5GHz)"
                min="1"
                max="165"
                className="w-full px-4 py-2 bg-terminal-dark border border-terminal-green/20 rounded text-terminal-green placeholder-terminal-green/40 outline-none focus:border-terminal-green/50"
              />
              <p className="text-xs text-terminal-green/60 mt-1">
                2.4GHz: 1-13 | 5GHz: 36-165 | Best channels: 1, 6, 11
              </p>
            </div>

            {/* Signal Strength Input */}
            <div>
              <label className="text-sm text-terminal-cyan mb-2 block">Signal Strength (dBm) (optional)</label>
              <input
                type="number"
                value={signalStrength}
                onChange={(e) => setSignalStrength(e.target.value)}
                placeholder="e.g., -50 to -80"
                min="-100"
                max="0"
                className="w-full px-4 py-2 bg-terminal-dark border border-terminal-green/20 rounded text-terminal-green placeholder-terminal-green/40 outline-none focus:border-terminal-green/50"
              />
              <p className="text-xs text-terminal-green/60 mt-1">
                -30 to -70 (Excellent) | -70 to -80 (Good) | -80+ (Fair/Poor)
              </p>
            </div>

            {/* Analyze Button */}
            <button
              onClick={analyzeWiFi}
              className="w-full border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black py-3 px-6 rounded transition-colors font-bold mt-6"
            >
              Analyze WiFi Security
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Security Level */}
            <div className={`border rounded p-6 ${
              result.score <= 10 ? 'border-terminal-green bg-terminal-dark' :
              result.score <= 30 ? 'border-terminal-cyan bg-terminal-dark' :
              result.score <= 50 ? 'border-terminal-yellow bg-terminal-dark' :
              'border-terminal-red bg-terminal-dark'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">
                  {result.score <= 10 ? '✓' : result.score <= 30 ? '✓' : '⚠'} {result.securityLevel}
                </h3>
                <span className={`text-sm font-bold px-3 py-1 rounded ${
                  result.score <= 10 ? 'bg-terminal-green text-terminal-black' :
                  result.score <= 30 ? 'bg-terminal-cyan text-terminal-black' :
                  result.score <= 50 ? 'bg-terminal-yellow text-terminal-black' :
                  'bg-terminal-red text-white'
                }`}>
                  Risk: {result.score}%
                </span>
              </div>

              {/* Security Bar */}
              <div className="mb-6">
                <div className="w-full bg-terminal-darker border border-terminal-green/20 rounded h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      result.score <= 10
                        ? 'bg-terminal-green'
                        : result.score <= 30
                        ? 'bg-terminal-cyan'
                        : result.score <= 50
                        ? 'bg-terminal-yellow'
                        : 'bg-terminal-red'
                    }`}
                    style={{ width: `${result.score}%` }}
                  />
                </div>
              </div>

              {/* Network Details */}
              <div className="grid grid-cols-2 gap-4 text-sm border-t border-terminal-green/20 pt-4">
                <div>
                  <p className="text-terminal-cyan/60 text-xs">Network</p>
                  <p className="text-terminal-green">{result.ssid}</p>
                </div>
                <div>
                  <p className="text-terminal-cyan/60 text-xs">Encryption</p>
                  <p className={`text-${result.encryptionInfo.color}`}>{result.encryption}</p>
                </div>
                <div>
                  <p className="text-terminal-cyan/60 text-xs">Channel</p>
                  <p className="text-terminal-green">{result.channel}</p>
                </div>
                <div>
                  <p className="text-terminal-cyan/60 text-xs">Signal</p>
                  <p className="text-terminal-green">{result.signalStrength}</p>
                </div>
              </div>
            </div>

            {/* Encryption Assessment */}
            <div className={`border rounded p-6 bg-terminal-dark border-${result.encryptionInfo.color}`}>
              <h3 className="font-bold mb-3 text-terminal-cyan">Encryption Assessment:</h3>
              <p className="text-sm text-terminal-green mb-3">{result.encryptionInfo.description}</p>
              <p className={`text-sm font-bold text-${result.encryptionInfo.color}`}>
                Security Level: {result.encryptionInfo.security}
              </p>
            </div>

            {/* Warnings */}
            {result.warnings.length > 0 && (
              <div className="border border-terminal-red/30 rounded p-6 bg-terminal-dark">
                <p className="text-sm text-terminal-red mb-3 font-bold">⚠ Issues Found ({result.warnings.length}):</p>
                <ul className="space-y-2">
                  {result.warnings.map((warning, idx) => (
                    <li key={idx} className="text-sm text-terminal-cyan">
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Safe Indicators */}
            {result.safe.length > 0 && (
              <div className="border border-terminal-green/30 rounded p-6 bg-terminal-dark">
                <p className="text-sm text-terminal-green mb-3 font-bold">✓ Good Practices ({result.safe.length}):</p>
                <ul className="space-y-2">
                  {result.safe.map((item, idx) => (
                    <li key={idx} className="text-sm text-terminal-green">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            <div className="border border-terminal-green/20 rounded p-6 bg-terminal-dark">
              <h3 className="font-bold mb-4 text-terminal-cyan">Security Recommendations:</h3>
              <ul className="space-y-2 text-sm">
                {result.encryption === 'Open' ? (
                  <>
                    <li className="text-terminal-red">❌ CRITICAL: Enable WPA2 or WPA3 encryption immediately</li>
                    <li className="text-terminal-green">• Log into your router admin panel</li>
                    <li className="text-terminal-green">• Change WiFi encryption to WPA2 or WPA3</li>
                  </>
                ) : result.encryption === 'WEP' || result.encryption === 'WPA' ? (
                  <>
                    <li className="text-terminal-yellow">⚠ Upgrade to WPA2 or WPA3</li>
                    <li className="text-terminal-green">• Access router settings</li>
                    <li className="text-terminal-green">• Update security protocol</li>
                  </>
                ) : result.encryption === 'WPA2' ? (
                  <>
                    <li className="text-terminal-green">✓ WPA2 is secure, but consider upgrading</li>
                    <li className="text-terminal-green">• If supported, upgrade router to WPA3</li>
                    <li className="text-terminal-green">• Use a strong WiFi password (16+ characters)</li>
                  </>
                ) : (
                  <>
                    <li className="text-terminal-green">✓ WPA3 provides excellent security</li>
                    <li className="text-terminal-green">• Maintain a strong WiFi password</li>
                    <li className="text-terminal-green">• Keep router firmware updated</li>
                  </>
                )}
                <li className="text-terminal-green">• Disable WPS (WiFi Protected Setup)</li>
                <li className="text-terminal-green">• Change default router password</li>
                <li className="text-terminal-green">• Hide SSID broadcast (optional extra security)</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WiFiAnalyzer
