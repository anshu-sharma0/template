import type { WeddingInvitationData } from "@/lib/wedding-types";
import { MUSIC_TRACKS } from "@/lib/birthday-data";
import { MusicButton } from "@/components/invitation/MusicButton";
import { Input } from "@/components/ui/Input";

type ExtrasFormProps = {
  data: WeddingInvitationData;
  onChange: (updates: Partial<WeddingInvitationData>) => void;
};

export function ExtrasForm({ data, onChange }: ExtrasFormProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="font-display text-3xl font-normal text-text">
          Add the finishing touches.
        </h2>
        <p className="text-sm text-text-muted">
          Configure music, countdown timer, family section, and RSVP details.
        </p>
      </div>

      {/* Music Selector */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-text">
          Background Atmosphere Music
        </label>
        <div className="grid gap-3 sm:grid-cols-2 max-w-lg">
          {MUSIC_TRACKS.map((track) => {
            const isSelected = data.music === track.id;
            return (
              <div
                key={track.id}
                onClick={() => onChange({ music: track.id })}
                className={`flex items-center justify-between cursor-pointer rounded-xl border p-4 shadow-xs transition ${
                  isSelected
                    ? "border-primary bg-primary-soft/40 ring-1 ring-primary"
                    : "border-border bg-surface hover:bg-surface-soft"
                }`}
              >
                <div>
                  <h4 className="font-display text-base font-normal">{track.title}</h4>
                  <p className="text-[11px] text-text-muted">{track.mood}</p>
                </div>
                <span className={`size-5 rounded-full border flex items-center justify-center text-xs ${isSelected ? "border-primary bg-primary text-white" : "border-border"}`}>
                  ✓
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="space-y-3 pt-4 border-t border-border/60">
        <label className="block text-xs font-semibold uppercase tracking-wider text-text">
          Interactive Invitation Features
        </label>

        <div className="space-y-2 max-w-md">
          {/* Countdown Toggle */}
          <label className="flex items-center justify-between rounded-xl border border-border bg-surface p-4 cursor-pointer hover:bg-surface-soft">
            <div>
              <p className="font-display text-base font-normal">Show Wedding Countdown</p>
              <p className="text-xs text-text-muted">Displays a live days, hours, mins timer</p>
            </div>
            <input
              type="checkbox"
              checked={data.showCountdown}
              onChange={(e) => onChange({ showCountdown: e.target.checked })}
              className="size-5 rounded border-border text-primary focus:ring-primary"
            />
          </label>

          {/* Family Section Toggle */}
          <label className="flex items-center justify-between rounded-xl border border-border bg-surface p-4 cursor-pointer hover:bg-surface-soft">
            <div>
              <p className="font-display text-base font-normal">Show Family Names</p>
              <p className="text-xs text-text-muted">Displays parent/family blessing section</p>
            </div>
            <input
              type="checkbox"
              checked={data.showFamily}
              onChange={(e) => onChange({ showFamily: e.target.checked })}
              className="size-5 rounded border-border text-primary focus:ring-primary"
            />
          </label>

          {/* RSVP Toggle */}
          <label className="flex items-center justify-between rounded-xl border border-border bg-surface p-4 cursor-pointer hover:bg-surface-soft">
            <div>
              <p className="font-display text-base font-normal">Show RSVP Section</p>
              <p className="text-xs text-text-muted">Displays attendance confirmation invitation</p>
            </div>
            <input
              type="checkbox"
              checked={data.showRSVP}
              onChange={(e) => onChange({ showRSVP: e.target.checked })}
              className="size-5 rounded border-border text-primary focus:ring-primary"
            />
          </label>
        </div>
      </div>

      {/* RSVP Configuration */}
      {data.showRSVP && (
        <div className="space-y-3 pt-4 border-t border-border/60">
          <label className="block text-xs font-semibold uppercase tracking-wider text-text">
            RSVP Details
          </label>
          <div className="grid gap-3 sm:grid-cols-2 max-w-lg">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-text">RSVP Section Heading</label>
              <Input
                value={data.rsvp.heading}
                onChange={(e) =>
                  onChange({
                    rsvp: { ...data.rsvp, heading: e.target.value },
                  })
                }
                placeholder="e.g. We Would Love to Celebrate With You"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-text">Contact Information</label>
              <Input
                value={data.rsvp.contact}
                onChange={(e) =>
                  onChange({
                    rsvp: { ...data.rsvp, contact: e.target.value },
                  })
                }
                placeholder="e.g. Phone or RSVP Email"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
