import { useState } from "react";
import type { WeddingInvitationData, WeddingEvent } from "@/lib/wedding-types";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

type EventsFormProps = {
  data: WeddingInvitationData;
  onChange: (updates: Partial<WeddingInvitationData>) => void;
};

export function EventsForm({ data, onChange }: EventsFormProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  // New Event Draft State
  const [newEvent, setNewEvent] = useState<Partial<WeddingEvent>>({
    title: "",
    date: "",
    time: "",
    venue: "",
    description: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleRemoveEvent = (id: string) => {
    const updated = data.events.filter((e) => e.id !== id);
    onChange({ events: updated });
  };

  const handleUpdateEvent = (id: string, updates: Partial<WeddingEvent>) => {
    const updated = data.events.map((evt) => (evt.id === id ? { ...evt, ...updates } : evt));
    onChange({ events: updated });
  };

  const handleAddEventSubmit = () => {
    if (!newEvent.title?.trim()) return;
    const created: WeddingEvent = {
      id: `evt_${Date.now()}`,
      title: newEvent.title,
      date: newEvent.date || data.weddingDate,
      time: newEvent.time || "",
      venue: newEvent.venue || data.venue.name || "",
      description: newEvent.description || "",
    };
    onChange({ events: [...data.events, created] });
    setNewEvent({ title: "", date: "", time: "", venue: "", description: "" });
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="font-display text-3xl font-normal text-text">
          Tell them when to celebrate with you.
        </h2>
        <p className="text-sm text-text-muted">
          Add your wedding functions (Mehendi, Sangeet, Ceremony, Reception).
        </p>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {data.events.map((evt) => {
          const isEditing = editingId === evt.id;

          if (isEditing) {
            return (
              <div key={evt.id} className="rounded-2xl border-2 border-primary/40 bg-surface p-5 space-y-4 shadow-soft">
                <div className="flex justify-between items-center pb-2 border-b border-border/60">
                  <h3 className="font-display text-xl text-primary font-normal">Edit Event</h3>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="text-xs font-semibold text-text-muted hover:text-text"
                  >
                    Done
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-text">Event Title</label>
                    <Input
                      value={evt.title}
                      onChange={(e) => handleUpdateEvent(evt.id, { title: e.target.value })}
                      placeholder="e.g. Sangeet & Cocktails"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-text">Date</label>
                    <Input
                      type="date"
                      value={evt.date || ""}
                      onChange={(e) => handleUpdateEvent(evt.id, { date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-text">Time</label>
                    <Input
                      value={evt.time || ""}
                      onChange={(e) => handleUpdateEvent(evt.id, { time: e.target.value })}
                      placeholder="e.g. 7:30 PM"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-text">Venue</label>
                    <Input
                      value={evt.venue || ""}
                      onChange={(e) => handleUpdateEvent(evt.id, { venue: e.target.value })}
                      placeholder="e.g. Grand Ballroom"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-text">Description</label>
                  <Textarea
                    rows={2}
                    value={evt.description || ""}
                    onChange={(e) => handleUpdateEvent(evt.id, { description: e.target.value })}
                    placeholder="Short detail for guests..."
                  />
                </div>
              </div>
            );
          }

          return (
            <div key={evt.id} className="rounded-2xl border border-border bg-surface p-5 shadow-soft flex items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-normal text-text">{evt.title}</h3>
                <p className="text-xs font-semibold text-primary mt-1">
                  {evt.date || "Date TBA"} {evt.time ? `• ${evt.time}` : ""}
                </p>
                {evt.venue && <p className="text-xs text-text-muted mt-0.5">📍 {evt.venue}</p>}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingId(evt.id)}
                  className="rounded-full border border-border bg-surface-soft px-3 py-1.5 text-xs font-semibold text-text hover:bg-border"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveEvent(evt.id)}
                  className="rounded-full border border-primary/20 bg-primary-soft/50 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary-soft"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Event Action */}
      {isAdding ? (
        <div className="rounded-2xl border-2 border-primary/40 bg-surface-soft/60 p-5 space-y-4 shadow-soft">
          <h3 className="font-display text-xl text-primary font-normal">Add Celebration Event</h3>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase text-text">Event Title *</label>
              <Input
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="e.g. Reception & Dinner"
                autoFocus
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase text-text">Date</label>
              <Input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase text-text">Time</label>
              <Input
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                placeholder="e.g. 8:00 PM"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase text-text">Venue Location</label>
              <Input
                value={newEvent.venue}
                onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                placeholder="e.g. Pavilion Hall"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button type="button" size="sm" onClick={handleAddEventSubmit}>
              Add Event
            </Button>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsAdding(true)}
          className="w-full border-dashed"
        >
          + Add Celebration Event
        </Button>
      )}
    </div>
  );
}
