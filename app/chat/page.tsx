"use client"
import { useState } from 'react';
import axios from 'axios';

const hardcodedContext = `
You are an AI assistant helping a user understand and manage their insurance plan.
The user has the following information:
- Name: Alex Smith
- Insurance Provider: Kaiser Permanente Gold 1500/20
- Plan: Gold PPO
- Deductible: $1,500
- Monthly Premium: $450
- Copay: $20
- Coverage: Dental, Vision, General Medical
- Network: Kaiser Permanente Integrated Network
- Good for: [
  "integrated_care",
  "preventive_services",
  "specialist_access",
  "no_referrals_needed",
  "predictable_costs"
]
Answer clearly and helpfully based on this context, but keep it concise and short answers. Answer all in one paragraph.
`;

export default function InsuranceChat() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('/api/claude', {
        messages: newMessages,
        context: hardcodedContext,
      });

      setMessages([...newMessages, { role: 'assistant', content: res.data.reply }]);
    } catch (err: any) {
      console.error('API Error:', err);
      setError(err.response?.data?.error || 'Failed to get response');
      
      // Optional: Show error in chat
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again later.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat About Your Insurance</h1>

      <div className="border rounded-md p-4 h-96 overflow-y-auto mb-4">
        {messages.length === 0 && (
          <p className="text-gray-500">Ask anything about your insurance plan.</p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span
              className={`inline-block px-3 py-2 rounded ${
                msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
        {loading && (
          <div className="text-center">
            <span className="inline-block px-3 py-2 bg-gray-100 rounded">Thinking...</span>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="flex-grow border rounded px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
