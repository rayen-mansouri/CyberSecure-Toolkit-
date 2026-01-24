import { useState } from 'react'

function SecurityTutorial({ onBack }) {
  const [expandedSection, setExpandedSection] = useState(null)

  const sections = [
    {
      id: 'phishing',
      title: 'Phishing & Email Scams',
      icon: '📧',
      dangers: [
        {
          name: 'Email Spoofing',
          description: 'Hackers send emails that look like they\'re from legitimate companies',
          redFlags: [
            'Sender email doesn\'t match company domain (paypa1.com instead of paypal.com)',
            'Generic greetings like "Dear Customer" instead of your name',
            'Urgent requests for immediate action',
            'Suspicious links that don\'t match the text'
          ],
          protection: [
            'Hover over links to see the real URL before clicking',
            'Check sender email address carefully',
            'Contact company directly through their official website',
            'Never click links in unexpected emails',
            'Look for HTTPS and security badges on websites'
          ]
        },
        {
          name: 'Attachment Malware',
          description: 'Emails containing infected files that install malware on your device',
          redFlags: [
            'Unexpected attachments from unknown senders',
            'Files with double extensions (document.pdf.exe)',
            'Generic file names like "invoice.zip"',
            'Requests to disable antivirus to open file'
          ],
          protection: [
            'Don\'t open attachments from unknown senders',
            'Scan attachments with malware checker first',
            'Enable antivirus software',
            'Keep software and OS updated',
            'Use email filtering features'
          ]
        }
      ]
    },
    {
      id: 'social',
      title: 'Social Engineering Attacks',
      icon: '🎭',
      dangers: [
        {
          name: 'Pretexting',
          description: 'Attacker creates a false scenario to trick you into revealing information',
          redFlags: [
            'Caller claims to be from IT/bank/company support',
            'Requests to verify personal information',
            'Creates sense of urgency or authority',
            'Asks for passwords or security codes'
          ],
          protection: [
            'Legitimate companies never ask for passwords via phone',
            'Always verify caller identity independently',
            'Hang up and call the company directly',
            'Don\'t provide sensitive info to unverified callers',
            'Ask for callback number and verify it'
          ]
        },
        {
          name: 'Baiting',
          description: 'Offering something enticing (USB, download) that contains malware',
          redFlags: [
            'Unsolicited USB drives or devices',
            'Suspicious downloads offering free software',
            'Too-good-to-be-true prizes or offers',
            'Unknown file sharing links'
          ],
          protection: [
            'Never plug in unknown USB devices',
            'Download software only from official sources',
            'Be skeptical of unexpected giveaways',
            'Use antivirus on external devices',
            'Don\'t click unknown file sharing links'
          ]
        },
        {
          name: 'Tailgating/Piggybacking',
          description: 'Attacker follows you into restricted areas by pretending to belong',
          redFlags: [
            'Stranger following closely through secure doors',
            'Person holding many items asking for help',
            'Impersonating staff or delivery personnel',
            'Claiming to be new employee'
          ],
          protection: [
            'Never hold doors open for unknown people',
            'Challenge people you don\'t recognize',
            'Check ID badges carefully',
            'Don\'t assume someone is legitimate',
            'Report suspicious behavior immediately'
          ]
        }
      ]
    },
    {
      id: 'password',
      title: 'Password & Account Attacks',
      icon: '🔑',
      dangers: [
        {
          name: 'Credential Stuffing',
          description: 'Using leaked passwords from one site to access other accounts',
          redFlags: [
            'Unusual login attempts from different locations',
            'Accounts accessed without your knowledge',
            'Password reuse across multiple sites',
            'Old breached passwords being used'
          ],
          protection: [
            'Use unique passwords for each account',
            'Enable two-factor authentication (2FA)',
            'Monitor account activity regularly',
            'Change passwords if any account is breached',
            'Use a password manager to create strong passwords'
          ]
        },
        {
          name: 'Keyloggers & Screen Capture',
          description: 'Malware that records your keystrokes and screenshots',
          redFlags: [
            'Strange behavior on your computer',
            'Unexpected programs running',
            'Device running slowly',
            'Battery draining quickly on laptops'
          ],
          protection: [
            'Keep antivirus software updated',
            'Download software only from official sources',
            'Don\'t click suspicious links',
            'Use on-screen keyboard for sensitive passwords',
            'Cover webcam and camera'
          ]
        },
        {
          name: 'Brute Force Attacks',
          description: 'Attacker tries many password combinations to guess your password',
          redFlags: [
            'Multiple failed login attempts',
            'Account temporarily locked',
            'Unusual login locations'
          ],
          protection: [
            'Use strong, complex passwords (16+ characters)',
            'Enable account lockout after failed attempts',
            'Use 2FA for critical accounts',
            'Avoid predictable patterns in passwords',
            'Change passwords regularly'
          ]
        }
      ]
    },
    {
      id: 'network',
      title: 'Network & WiFi Attacks',
      icon: '📡',
      dangers: [
        {
          name: 'Man-in-the-Middle (MITM)',
          description: 'Attacker intercepts communication between you and a website',
          redFlags: [
            'Using unencrypted HTTP instead of HTTPS',
            'Public WiFi without password',
            'Missing security certificates',
            'Website looks slightly different'
          ],
          protection: [
            'Only use HTTPS websites (lock icon)',
            'Avoid public WiFi for sensitive transactions',
            'Use VPN on public networks',
            'Verify SSL certificates',
            'Don\'t transmit passwords on public WiFi'
          ]
        },
        {
          name: 'WiFi Eavesdropping',
          description: 'Attacker listens to unencrypted data on public WiFi',
          redFlags: [
            'Using unencrypted WiFi networks',
            'Transmitting passwords on public WiFi',
            'No VPN protection while on public network'
          ],
          protection: [
            'Use VPN on all public WiFi networks',
            'Only access HTTPS sites on public WiFi',
            'Don\'t log into banking on public networks',
            'Use mobile hotspot for sensitive activities',
            'Check WiFi network name carefully'
          ]
        },
        {
          name: 'Evil Twin Networks',
          description: 'Fake WiFi network with same name as legitimate one',
          redFlags: [
            'Two networks with identical or similar names',
            'Weak encryption on "public" network',
            'Network suddenly appearing',
            'Connection drops and reconnects frequently'
          ],
          protection: [
            'Ask venue staff which network to use',
            'Check network password if unsure',
            'Use VPN even on "official" public WiFi',
            'Look for HTTPS/lock icon',
            'Turn off auto-connect features'
          ]
        }
      ]
    },
    {
      id: 'general',
      title: 'General Security Practices',
      icon: '🛡️',
      dangers: [
        {
          name: 'Software Vulnerabilities',
          description: 'Outdated software has security holes hackers can exploit',
          redFlags: [
            'Ignored update notifications',
            'Using old/unsupported operating systems',
            'Out-of-date browser'
          ],
          protection: [
            'Enable automatic updates',
            'Update all software regularly',
            'Remove unused applications',
            'Use supported operating systems',
            'Keep browser and extensions updated'
          ]
        },
        {
          name: 'Social Media Oversharing',
          description: 'Posting personal information that helps attackers',
          redFlags: [
            'Publishing full date of birth',
            'Sharing location in real-time',
            'Posting vacation photos while away',
            'Revealing security question answers',
            'Publishing work address or schedule'
          ],
          protection: [
            'Review privacy settings regularly',
            'Don\'t share real-time location',
            'Post vacation photos after returning',
            'Be vague with personal details',
            'Don\'t post security question answers',
            'Think before you post'
          ]
        },
        {
          name: 'Recovery Questions Weakness',
          description: 'Attackers research answers to recovery questions',
          redFlags: [
            'Using publicly available information',
            'Same recovery answer across accounts',
            'Information shared on social media'
          ],
          protection: [
            'Use unique, creative answers',
            'Don\'t use real answers - use fictional ones',
            'Don\'t share answers on social media',
            'Write down answers in secure place',
            'Use different answers for each account'
          ]
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-terminal-black">
      {/* Header */}
      <div className="border-b border-terminal-green/20 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">🎓 Security Tutorial</h1>
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
          <h2 className="text-xl font-bold mb-4">Protect Yourself from Common Attacks</h2>
          <p className="text-terminal-cyan text-sm">
            Learn about the most common social engineering and hacking techniques used by cybercriminals, 
            and discover practical strategies to protect yourself. Click on each category to explore specific threats and defenses.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="border border-terminal-green/20 rounded overflow-hidden">
              {/* Section Header */}
              <button
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                className="w-full p-6 hover:bg-terminal-dark/50 transition text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{section.icon}</span>
                  <h3 className="text-xl font-bold">{section.title}</h3>
                </div>
                <span className={`text-terminal-cyan transition transform ${expandedSection === section.id ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {/* Expanded Content */}
              {expandedSection === section.id && (
                <div className="border-t border-terminal-green/20 p-6 bg-terminal-dark/50 space-y-6">
                  {section.dangers.map((danger, idx) => (
                    <div key={idx} className="border border-terminal-green/20 rounded p-4 bg-terminal-darker">
                      <h4 className="text-lg font-bold text-terminal-cyan mb-2">{danger.name}</h4>
                      <p className="text-terminal-green/70 text-sm mb-4">{danger.description}</p>

                      {/* Red Flags */}
                      <div className="mb-4">
                        <p className="text-sm font-bold text-terminal-red mb-2">🚩 Red Flags:</p>
                        <ul className="space-y-1">
                          {danger.redFlags.map((flag, fIdx) => (
                            <li key={fIdx} className="text-xs text-terminal-cyan ml-4">
                              • {flag}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Protection */}
                      <div>
                        <p className="text-sm font-bold text-terminal-green mb-2">✓ How to Protect Yourself:</p>
                        <ul className="space-y-1">
                          {danger.protection.map((prot, pIdx) => (
                            <li key={pIdx} className="text-xs text-terminal-green ml-4">
                              • {prot}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Tips */}
        <div className="border border-terminal-green/20 rounded p-6 bg-terminal-dark mt-8">
          <h3 className="text-lg font-bold text-terminal-cyan mb-4">⚡ Quick Security Tips</h3>
          <ul className="space-y-2 text-sm">
            <li className="text-terminal-green">✓ When in doubt, say no - legitimate requests won't pressure you</li>
            <li className="text-terminal-green">✓ Verify before trusting - always confirm through official channels</li>
            <li className="text-terminal-green">✓ Your password is yours - legitimate companies never ask for it</li>
            <li className="text-terminal-green">✓ Stay skeptical - think critically about unexpected requests</li>
            <li className="text-terminal-green">✓ Report it - tell companies about suspicious activity</li>
            <li className="text-terminal-green">✓ Educate others - share what you learn with friends and family</li>
            <li className="text-terminal-green">✓ Use tools - leverage security tools we provide in this toolkit</li>
          </ul>
        </div>

        {/* Key Takeaways */}
        <div className="border border-terminal-cyan/30 rounded p-6 bg-terminal-dark mt-8">
          <h3 className="text-lg font-bold text-terminal-cyan mb-4">🎯 Key Takeaways</h3>
          <p className="text-terminal-green text-sm mb-3">
            The most effective attacks exploit human nature, not just technology. Hackers use:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="text-terminal-green">• <span className="font-bold">Trust</span> - Creating false authority</li>
            <li className="text-terminal-green">• <span className="font-bold">Urgency</span> - Pressuring quick decisions</li>
            <li className="text-terminal-green">• <span className="font-bold">Fear</span> - Threatening negative consequences</li>
            <li className="text-terminal-green">• <span className="font-bold">Curiosity</span> - Enticing with interesting links/files</li>
            <li className="text-terminal-green">• <span className="font-bold">Greed</span> - Offering rewards or money</li>
          </ul>
          <p className="text-terminal-cyan text-sm mt-4">
            By understanding these tactics, you can recognize and avoid them!
          </p>
        </div>
      </div>
    </div>
  )
}

export default SecurityTutorial
