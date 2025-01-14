import React from 'react';

interface EmailFormProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const EmailForm: React.FC<EmailFormProps> = ({ email, setEmail, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <div className="relative">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm"
          />
        </div>
        <div className="flex items-center gap-2 mt-3">
          <input
            type="checkbox"
            required
            id="loyalty"
            className="h-4 w-4"
          />
          <label htmlFor="loyalty" className="text-xs text-gray-600">
            Profitez d'avantages exclusifs en un clic 🎁
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-200 text-sm"
      >
        Valider
      </button>
    </form>
  );
};