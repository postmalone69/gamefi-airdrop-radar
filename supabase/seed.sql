insert into public.airdrop_projects
  (name, slug, chain, category, status, score, risk, funding, users_label, action, tags, website)
values
  ('Pixels', 'pixels', 'Ronin', 'Farming / Social Game', 'Live quests', 91, 'Medium', 'Strong ecosystem support', 'High', 'Track seasonal quests, land mechanics, token utility, and partner campaigns.', array['Ronin', 'quests', 'social'], 'https://www.pixels.xyz/'),
  ('Parallel Colony', 'parallel-colony', 'Base', 'AI GameFi', 'Early access watch', 87, 'Medium', 'Tier-1 attention', 'Growing', 'Monitor access waves, NFT ownership perks, and Base ecosystem quests.', array['Base', 'AI', 'NFT'], null),
  ('Nyan Heroes', 'nyan-heroes', 'Solana', 'Shooter', 'Campaigns active', 84, 'Medium', 'Backed', 'Growing', 'Join missions, check playtest windows, claim badges, preserve wallet history.', array['Solana', 'playtest', 'badges'], null),
  ('Illuvium', 'illuvium', 'Immutable', 'AAA GameFi', 'Ecosystem quests', 79, 'Low', 'Established', 'High', 'Track Immutable passport quests and asset interaction campaigns.', array['Immutable', 'passport', 'AAA'], null),
  ('Pirate Nation', 'pirate-nation', 'Proof of Play', 'On-chain RPG', 'Live economy', 76, 'Medium', 'Backed', 'Active', 'Watch chain expansion, resource loops, referral and creator campaigns.', array['on-chain', 'RPG', 'economy'], null),
  ('My Pet Hooligan', 'my-pet-hooligan', 'Ethereum / Layer-2', 'Action Game', 'Beta ecosystem', 72, 'High', 'Known brand', 'Niche', 'Prioritize free quests only; avoid expensive NFTs until signal improves.', array['beta', 'NFT', 'watchlist'], null)
on conflict (slug) do update set
  name = excluded.name,
  chain = excluded.chain,
  category = excluded.category,
  status = excluded.status,
  score = excluded.score,
  risk = excluded.risk,
  funding = excluded.funding,
  users_label = excluded.users_label,
  action = excluded.action,
  tags = excluded.tags,
  website = excluded.website,
  updated_at = now();
