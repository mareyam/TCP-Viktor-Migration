const PLATFORMS = ["Etsy", "eBay", "Shopify", "Amazon", "Meta", "TikTok"];

export default function PlatformBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      {PLATFORMS.map((platform) => (
        <span
          key={platform}
          className="rounded-full border border-brand-magenta px-4 py-2 text-sm font-medium text-brand-dark"
        >
          {platform}
        </span>
      ))}
      <span className="rounded-full border border-brand-magenta px-4 py-2 text-sm font-medium text-brand-dark">
        and more →
      </span>
    </div>
  );
}
