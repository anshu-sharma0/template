import type { WeddingInvitationData } from "@/lib/wedding-types";
import { Input } from "@/components/ui/Input";

type VenueFormProps = {
  data: WeddingInvitationData;
  onChange: (updates: Partial<WeddingInvitationData>) => void;
};

export function VenueForm({ data, onChange }: VenueFormProps) {
  const handleVenueChange = (field: string, value: string) => {
    onChange({
      venue: {
        ...data.venue,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="font-display text-3xl font-normal text-text">
          Where will we celebrate?
        </h2>
        <p className="text-sm text-text-muted">
          Add venue details and an optional Google Maps link for your guests.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="venueName" className="block text-xs font-semibold uppercase tracking-wider text-text">
            Venue Name
          </label>
          <Input
            id="venueName"
            value={data.venue.name || ""}
            onChange={(e) => handleVenueChange("name", e.target.value)}
            placeholder="e.g. The Grand Palace"
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="venueAddress" className="block text-xs font-semibold uppercase tracking-wider text-text">
            Venue Address
          </label>
          <Input
            id="venueAddress"
            value={data.venue.address || ""}
            onChange={(e) => handleVenueChange("address", e.target.value)}
            placeholder="e.g. 123 Mall Road, Amritsar, Punjab"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="mapsUrl" className="block text-xs font-semibold uppercase tracking-wider text-text">
            Google Maps Location Link <span className="text-text-muted font-normal">(Optional)</span>
          </label>
          <Input
            id="mapsUrl"
            value={data.venue.mapsUrl || ""}
            onChange={(e) => handleVenueChange("mapsUrl", e.target.value)}
            placeholder="https://maps.google.com/..."
          />
          <p className="text-xs text-text-muted">
            This link will display a &ldquo;View Location →&rdquo; button for guests.
          </p>
        </div>
      </div>
    </div>
  );
}
