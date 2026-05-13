import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { MonthInput } from "./MonthInput";
import { SectionCard } from "./SectionCard";
import type { ResearchPublicationItem } from "../types/master-profile.types";
import styles from "./ResearchPublicationsSection.module.scss";

interface ResearchPublicationsSectionProps {
  items: ResearchPublicationItem[];
  onChange: (items: ResearchPublicationItem[]) => void;
}

const EMPTY_PUBLICATION: ResearchPublicationItem = {
  title: "",
  venue: "",
  publicationDate: "",
  url: "",
  summary: "",
};

export function ResearchPublicationsSection({
  items,
  onChange,
}: ResearchPublicationsSectionProps) {
  const [draftPublication, setDraftPublication] =
    useState<ResearchPublicationItem | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingPublication, setEditingPublication] =
    useState<ResearchPublicationItem | null>(null);

  function updateDraftPublication(
    field: keyof ResearchPublicationItem,
    value: string,
  ) {
    setDraftPublication((currentValue) =>
      currentValue ? { ...currentValue, [field]: value } : currentValue,
    );
  }

  function saveDraftPublication() {
    if (!draftPublication) {
      return;
    }

    const normalizedPublication: ResearchPublicationItem = {
      title: draftPublication.title.trim(),
      venue: draftPublication.venue.trim(),
      publicationDate: draftPublication.publicationDate.trim(),
      url: draftPublication.url.trim(),
      summary: draftPublication.summary.trim(),
    };

    if (
      !normalizedPublication.title ||
      !normalizedPublication.venue ||
      !normalizedPublication.publicationDate
    ) {
      return;
    }

    onChange([...items, normalizedPublication]);
    setDraftPublication(null);
  }

  function startEditingPublication(index: number) {
    setEditingIndex(index);
    setEditingPublication({ ...items[index] });
  }

  function updateEditingPublication(
    field: keyof ResearchPublicationItem,
    value: string,
  ) {
    setEditingPublication((currentValue) =>
      currentValue ? { ...currentValue, [field]: value } : currentValue,
    );
  }

  function removePublication(index: number) {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));

    if (editingIndex === index) {
      setEditingIndex(null);
      setEditingPublication(null);
      return;
    }

    if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  }

  function cancelEditingPublication() {
    setEditingIndex(null);
    setEditingPublication(null);
  }

  function saveEditingPublication() {
    if (editingIndex === null || !editingPublication) {
      return;
    }

    const normalizedPublication: ResearchPublicationItem = {
      title: editingPublication.title.trim(),
      venue: editingPublication.venue.trim(),
      publicationDate: editingPublication.publicationDate.trim(),
      url: editingPublication.url.trim(),
      summary: editingPublication.summary.trim(),
    };

    if (
      !normalizedPublication.title ||
      !normalizedPublication.venue ||
      !normalizedPublication.publicationDate
    ) {
      return;
    }

    onChange(
      items.map((item, itemIndex) =>
        itemIndex === editingIndex ? normalizedPublication : item,
      ),
    );
    setEditingIndex(null);
    setEditingPublication(null);
  }

  return (
    <SectionCard
      action={
        <button
          className={styles["research-publications__header-action"]}
          onClick={() => setDraftPublication({ ...EMPTY_PUBLICATION })}
          type="button"
        >
          <Icon name="add_circle" />
          <span>Add Publication</span>
        </button>
      }
      icon={<Icon name="menu_book" />}
      title="Research Publications"
    >
      <div className={styles["research-publications"]}>
        {!draftPublication && items.length === 0 ? (
          <p className={styles["research-publications__empty"]}>
            No research publications added yet.
          </p>
        ) : null}

        {draftPublication ? (
          <article
            className={`${styles["research-publications__item"]} ${styles["research-publications__item--draft"]}`}
          >
            <div className={styles["research-publications__draft-badge"]}>
              New Publication
            </div>

            <div className={styles["research-publications__grid"]}>
              <label className={styles["research-publications__field"]}>
                <span>Title</span>
                <input
                  onChange={(event) =>
                    updateDraftPublication("title", event.target.value)
                  }
                  placeholder="Enter publication title"
                  type="text"
                  value={draftPublication.title}
                />
              </label>
              <label className={styles["research-publications__field"]}>
                <span>Venue</span>
                <input
                  onChange={(event) =>
                    updateDraftPublication("venue", event.target.value)
                  }
                  placeholder="Enter journal or conference name"
                  type="text"
                  value={draftPublication.venue}
                />
              </label>
              <label className={styles["research-publications__field"]}>
                <span>Publication Date</span>
                <MonthInput
                  onChange={(event) =>
                    updateDraftPublication("publicationDate", event.target.value)
                  }
                  value={draftPublication.publicationDate}
                />
              </label>
              <label className={styles["research-publications__field"]}>
                <span>Link</span>
                <input
                  onChange={(event) =>
                    updateDraftPublication("url", event.target.value)
                  }
                  placeholder="https://..."
                  type="url"
                  value={draftPublication.url}
                />
              </label>
            </div>

            <label className={styles["research-publications__summary"]}>
              <span>Summary</span>
              <textarea
                onChange={(event) =>
                  updateDraftPublication("summary", event.target.value)
                }
                placeholder="Add a short summary of the publication, contribution, or impact."
                rows={4}
                value={draftPublication.summary}
              />
            </label>

            <div className={styles["research-publications__draft-actions"]}>
              <button
                className={styles["research-publications__cancel"]}
                onClick={() => setDraftPublication(null)}
                type="button"
              >
                Cancel
              </button>
              <button
                className={styles["research-publications__save"]}
                onClick={saveDraftPublication}
                type="button"
              >
                Add Publication
              </button>
            </div>
          </article>
        ) : null}

        {items.map((item, index) =>
          editingIndex === index && editingPublication ? (
            <article
              key={`${item.title}-${item.venue}-${index}`}
              className={`${styles["research-publications__item"]} ${styles["research-publications__item--draft"]}`}
            >
              <div className={styles["research-publications__draft-badge"]}>
                Edit Publication
              </div>

              <div className={styles["research-publications__grid"]}>
                <label className={styles["research-publications__field"]}>
                  <span>Title</span>
                  <input
                    onChange={(event) =>
                      updateEditingPublication("title", event.target.value)
                    }
                    type="text"
                    value={editingPublication.title}
                  />
                </label>
                <label className={styles["research-publications__field"]}>
                  <span>Venue</span>
                  <input
                    onChange={(event) =>
                      updateEditingPublication("venue", event.target.value)
                    }
                    type="text"
                    value={editingPublication.venue}
                  />
                </label>
                <label className={styles["research-publications__field"]}>
                  <span>Publication Date</span>
                  <MonthInput
                    onChange={(event) =>
                      updateEditingPublication(
                        "publicationDate",
                        event.target.value,
                      )
                    }
                    value={editingPublication.publicationDate}
                  />
                </label>
                <label className={styles["research-publications__field"]}>
                  <span>Link</span>
                  <input
                    onChange={(event) =>
                      updateEditingPublication("url", event.target.value)
                    }
                    type="url"
                    value={editingPublication.url}
                  />
                </label>
              </div>

              <label className={styles["research-publications__summary"]}>
                <span>Summary</span>
                <textarea
                  onChange={(event) =>
                    updateEditingPublication("summary", event.target.value)
                  }
                  rows={4}
                  value={editingPublication.summary}
                />
              </label>

              <div className={styles["research-publications__draft-actions"]}>
                <button
                  className={styles["research-publications__cancel"]}
                  onClick={cancelEditingPublication}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className={styles["research-publications__save"]}
                  onClick={saveEditingPublication}
                  type="button"
                >
                  Done
                </button>
              </div>
            </article>
          ) : (
            <article
              key={`${item.title}-${item.venue}-${index}`}
              className={styles["research-publications__display-card"]}
            >
              <div className={styles["research-publications__content"]}>
                <p className={styles["research-publications__title"]}>{item.title}</p>
                <p className={styles["research-publications__meta"]}>
                  {item.venue} • {item.publicationDate}
                </p>
                {item.url ? (
                  <p className={styles["research-publications__link"]}>{item.url}</p>
                ) : null}
                {item.summary ? (
                  <p className={styles["research-publications__summary-text"]}>
                    {item.summary}
                  </p>
                ) : null}
              </div>

              <div className={styles["research-publications__toolbar"]}>
                <button
                  onClick={() => startEditingPublication(index)}
                  type="button"
                >
                  <Icon name="edit" />
                </button>
                <button
                  onClick={() => removePublication(index)}
                  type="button"
                >
                  <Icon name="delete" />
                </button>
              </div>
            </article>
          ),
        )}
      </div>
    </SectionCard>
  );
}
