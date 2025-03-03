import Image from 'next/image'
import Link from 'next/link'

const Weapons = () => {
  const weapons = [
    {
      name: 'M4 LIGHTNING',
      type: 'Assault Rifle',
      image: '/images/weapons/m4.png',
      stats: {
        damage: 75,
        accuracy: 85,
        mobility: 70,
        control: 80
      },
      description: 'Balanced assault rifle with optimized recoil for mobile play'
    },
    {
      name: 'RAPID SMG',
      type: 'Submachine Gun',
      image: '/images/weapons/smg.png',
      stats: {
        damage: 60,
        accuracy: 70,
        mobility: 90,
        control: 75
      },
      description: 'High rate of fire SMG perfect for close-range mobile combat'
    },
    {
      name: 'TACTICAL SNIPER',
      type: 'Sniper Rifle',
      image: '/images/weapons/sniper.png',
      stats: {
        damage: 95,
        accuracy: 90,
        mobility: 45,
        control: 65
      },
      description: 'Precision sniper with enhanced scope controls for touch screens'
    }
  ]

  return (
    <section id="weapons" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-chakra font-bold mb-4 neon-text text-center">MOBILE ARSENAL</h2>
        <p className="text-gray-300 mb-12 text-center max-w-2xl mx-auto">
          Master a diverse arsenal of weapons optimized for mobile gameplay with intuitive touch controls
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {weapons.map((weapon, index) => (
            <div key={index} className="game-card group">
              <div className="card-gradient p-6 h-full">
                <div className="relative h-48 mb-6">
                  <Image
                    src={weapon.image}
                    alt={weapon.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-chakra font-bold mb-2 text-[#00F0FF]">{weapon.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{weapon.type}</p>
                <p className="text-sm text-gray-300 mb-4">{weapon.description}</p>
                
                <div className="space-y-3">
                  {Object.entries(weapon.stats).map(([stat, value]) => (
                    <div key={stat} className="flex items-center justify-between">
                      <span className="text-sm text-gray-300 uppercase">{stat}</span>
                      <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#00F0FF] to-[#B026FF]"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800">
                  <Link 
                    href={`#weapon-${weapon.name.toLowerCase().replace(' ', '-')}`}
                    className="text-[#00F0FF] text-sm hover:text-[#FFE600] transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="#arsenal" className="secondary-button">
            VIEW ALL WEAPONS
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Weapons 