# Ad Implementation Guide: Antigravity Hub

### 1. Database Schema (Supabase)

```sql
CREATE TABLE ads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  link TEXT NOT NULL,
  type TEXT NOT NULL,  -- 'grid', 'combo', 'featured'
  price DECIMAL NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Frontend Component (`AdSlot.tsx`)

```tsx
export default function AdSlot({ ad }) {
  return (
    <div className="mb-4 rounded border border-emerald-500/20 bg-emerald-500/10 p-4 text-white">
      <span className="text-[7px] font-black tracking-widest text-emerald-500 uppercase">
        Sponsored
      </span>
      <h3 className="mt-1 text-sm font-bold">{ad.title}</h3>
      <p className="text-xs text-gray-400">{ad.description}</p>
      <a
        href={`${ad.link}?utm_source=antigravityhub`}
        className="mt-2 inline-block text-[10px] text-emerald-400 underline"
      >
        Learn More
      </a>
    </div>
  );
}
```

### 3. Pricing Tiers

- **Grid Ad**: $799/mo
- **Combo Package**: $1,500/mo
- **Standard Featured**: $499/mo
- **Newsletter**: $299/one-time
