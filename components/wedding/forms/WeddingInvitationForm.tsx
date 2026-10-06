import type { WeddingInvitationData } from "@/lib/wedding-types";
import { INVITATION_MESSAGE_PRESETS } from "@/lib/wedding-data";
import { Textarea } from "@/components/ui/Textarea";
import { Input } from "@/components/ui/Input";

type WeddingInvitationFormProps = {
  data: WeddingInvitationData;
  onChange: (updates: Partial<WeddingInvitationData>) => void;
};

const PRESET_KEYS = ["Traditional", "Elegant", "Romantic", "Minimal", "Warm"] as const;

export function WeddingInvitationForm({ data, onChange }: WeddingInvitationFormProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="font-display text-3xl font-normal text-text">
          How would you like to invite them?
        </h2>
        <p className="text-sm text-text-muted">
          Write an invitation message that reflects your warmth and style.
        </p>
      </div>

      {/* Preset Message Styles */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-text">
          Invitation Message Inspiration
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESET_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => onChange({ invitationMessage: INVITATION_MESSAGE_PRESETS[key] })}
              className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-text-muted transition hover:border-border/80 hover:bg-surface-soft hover:text-text"
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Message Textarea */}
      <div className="space-y-2">
        <label htmlFor="invitationMessage" className="block text-xs font-semibold uppercase tracking-wider text-text">
          Invitation Message Text
        </label>
        <Textarea
          id="invitationMessage"
          rows={5}
          value={data.invitationMessage}
          onChange={(e) => onChange({ invitationMessage: e.target.value })}
          placeholder="With the love and blessings of our families..."
          className="font-serif text-base leading-relaxed"
        />
      </div>

      {/* Family Blessings (Optional) */}
      <div className="space-y-4 pt-4 border-t border-border/60">
        <div className="space-y-1">
          <h3 className="font-display text-2xl text-text font-normal">
            With the love of our families
          </h3>
          <p className="text-xs text-text-muted">
            Add parents or family names if you would like them mentioned.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="brideFamily" className="block text-xs font-semibold uppercase tracking-wider text-text">
              Bride&apos;s Family <span className="text-text-muted font-normal">(Optional)</span>
            </label>
            <Input
              id="brideFamily"
              value={data.brideFamily || ""}
              onChange={(e) => onChange({ brideFamily: e.target.value })}
              placeholder="e.g. D/o Mr. & Mrs. Sharma"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="groomFamily" className="block text-xs font-semibold uppercase tracking-wider text-text">
              Groom&apos;s Family <span className="text-text-muted font-normal">(Optional)</span>
            </label>
            <Input
              id="groomFamily"
              value={data.groomFamily || ""}
              onChange={(e) => onChange({ groomFamily: e.target.value })}
              placeholder="e.g. S/o Mr. & Mrs. Kapoor"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
