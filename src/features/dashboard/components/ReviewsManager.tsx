import React from 'react';
import { Star, MessageSquare, ThumbsUp, ExternalLink } from 'lucide-react';

const MOCK_REVIEWS = [
  {
    author: 'Jean D.',
    rating: 5,
    comment: 'Super restaurant, ambiance géniale et service impeccable !',
    date: new Date(),
    replied: false,
    googleReviewId: 'abc123'
  },
  {
    author: 'Marie L.',
    rating: 4,
    comment: 'Très bon moment passé ici. Les plats sont délicieux.',
    date: new Date(Date.now() - 86400000),
    replied: true,
    googleReviewId: 'def456'
  },
  {
    author: 'Pierre M.',
    rating: 5,
    comment: 'Une découverte fantastique ! Je recommande vivement.',
    date: new Date(Date.now() - 172800000),
    replied: false,
    googleReviewId: 'ghi789'
  },
];

export const ReviewsManager: React.FC = () => {
  const handleReplyClick = (googleReviewId: string) => {
    // Remplacer par l'URL réelle de l'avis Google
    const googleReviewUrl = `https://search.google.com/local/reviews?placeid=YOUR_PLACE_ID#${googleReviewId}`;
    window.open(googleReviewUrl, '_blank');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Avis</h1>
        <p className="text-gray-600 mt-1">Gérez les avis Google de vos clients</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Note moyenne</p>
              <div className="flex items-center mt-1">
                <p className="text-2xl font-semibold text-gray-900">4.8</p>
                <Star className="w-5 h-5 text-yellow-400 ml-1" />
              </div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total des avis</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">89</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taux de réponse</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">92%</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <ThumbsUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Derniers avis</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {MOCK_REVIEWS.map((review, index) => (
            <div key={index} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <p className="font-medium text-gray-900">{review.author}</p>
                    <div className="flex items-center ml-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-500 mt-1">{review.comment}</p>
                </div>
                {!review.replied && (
                  <button
                    onClick={() => handleReplyClick(review.googleReviewId)}
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Répondre sur Google
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};