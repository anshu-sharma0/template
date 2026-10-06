import { useState } from "react";
import type { WeddingInvitationData, WeddingStoryItem } from "@/lib/wedding-types";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

type StoryFormProps = {
  data: WeddingInvitationData;
  onChange: (updates: Partial<WeddingInvitationData>) => void;
};

export function StoryForm({ data, onChange }: StoryFormProps) {
  const [newTimelineItem, setNewTimelineItem] = useState<Partial<WeddingStoryItem>>({
    date: "",
    title: "",
    description: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleTitleChange = (val: string) => {
    onChange({
      story: {
        ...data.story,
        title: val,
      },
    });
  };

  const handleDescriptionChange = (val: string) => {
    onChange({
      story: {
        ...data.story,
        description: val,
      },
    });
  };

  const handleRemoveTimelineItem = (id: string) => {
    const updated = data.story.timeline.filter((item) => item.id !== id);
    onChange({
      story: {
        ...data.story,
        timeline: updated,
      },
    });
  };

  const handleAddTimelineItemSubmit = () => {
    if (!newTimelineItem.title?.trim()) return;
    const created: WeddingStoryItem = {
      id: `story_${Date.now()}`,
      date: newTimelineItem.date || "2027",
      title: newTimelineItem.title,
      description: newTimelineItem.description || "",
    };
    onChange({
      story: {
        ...data.story,
        timeline: [...data.story.timeline, created],
      },
    });
    setNewTimelineItem({ date: "", title: "", description: "" });
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="font-display text-3xl font-normal text-text">
          Tell them a little about your story.
        </h2>
        <p className="text-sm text-text-muted">
          Share how you met and key milestones on your journey together.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="storyTitle" className="block text-xs font-semibold uppercase tracking-wider text-text">
            Section Title
          </label>
          <Input
            id="storyTitle"
            value={data.story.title || "Our Story"}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g. Our Story"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="storyDesc" className="block text-xs font-semibold uppercase tracking-wider text-text">
            Story Intro / Subtitle
          </label>
          <Input
            id="storyDesc"
            value={data.story.description || ""}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            placeholder="e.g. A few moments that brought us to this beautiful day."
          />
        </div>
      </div>

      {/* Timeline Items */}
      <div className="space-y-3 pt-4 border-t border-border/60">
        <label className="block text-xs font-semibold uppercase tracking-wider text-text">
          Timeline Milestones
        </label>

        <div className="space-y-3">
          {data.story.timeline.map((item) => (
            <div key={item.id} className="rounded-xl border border-border bg-surface p-4 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-primary">{item.date}</span>
                <h4 className="font-display text-lg text-text font-normal">{item.title}</h4>
                <p className="text-xs text-text-muted mt-0.5">{item.description}</p>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveTimelineItem(item.id)}
                className="rounded-full border border-primary/20 bg-primary-soft/40 px-3 py-1 text-xs font-semibold text-primary hover:bg-primary-soft"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Add Timeline Action */}
        {isAdding ? (
          <div className="rounded-2xl border-2 border-primary/40 bg-surface-soft/60 p-4 space-y-3">
            <h4 className="font-display text-lg text-primary font-normal">Add Story Milestone</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                value={newTimelineItem.date}
                onChange={(e) => setNewTimelineItem({ ...newTimelineItem, date: e.target.value })}
                placeholder="Year/Date (e.g. 2021)"
              />
              <Input
                value={newTimelineItem.title}
                onChange={(e) => setNewTimelineItem({ ...newTimelineItem, title: e.target.value })}
                placeholder="Milestone Title (e.g. Where We Met)"
              />
            </div>
            <Textarea
              rows={2}
              value={newTimelineItem.description}
              onChange={(e) => setNewTimelineItem({ ...newTimelineItem, description: e.target.value })}
              placeholder="Short story detail..."
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button type="button" size="sm" onClick={handleAddTimelineItemSubmit}>
                Add Milestone
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
            + Add Story Milestone
          </Button>
        )}
      </div>
    </div>
  );
}
