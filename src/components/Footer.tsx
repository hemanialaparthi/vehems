import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-15">
          <div>
            <h3 className="text-xl font-bold mb-4">Vehems</h3>
            <p className="text-gray-300">
              Your trusted source for IGCSE notes and study materials. 
              Helping students excel in their academic journey.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/subjects" className="hover:text-white transition-colors">All Subjects</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2025 Vehems. All rights reserved. Made with ❤️ for IGCSE students.</p>
        </div>
      </div>
    </footer>
  );
}
