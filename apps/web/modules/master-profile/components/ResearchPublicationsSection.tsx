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

  function updateExistingPublication(
    index: number,
    field: keyof ResearchPublicationItem,
    value: string,
  ) {
    onChange(
      items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    );
  }

  function removePublication(index: number) {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
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

        {items.map((item, index) => (
          <article
            key={`${item.title}-${item.venue}-${index}`}
            className={styles["research-publications__item"]}
          >
            <div className={styles["research-publications__toolbar"]}>
              <button
                onClick={() => removePublication(index)}
                type="button"
              >
                <Icon name="delete" />
              </button>
            </div>

            <div className={styles["research-publications__grid"]}>
              <label className={styles["research-publications__field"]}>
                <span>Title</span>
                <input
                  onChange={(event) =>
                    updateExistingPublication(index, "title", event.target.value)
                  }
                  type="text"
                  value={item.title}
                />
              </label>
              <label className={styles["research-publications__field"]}>
                <span>Venue</span>
                <input
                  onChange={(event) =>
                    updateExistingPublication(index, "venue", event.target.value)
                  }
                  type="text"
                  value={item.venue}
                />
              </label>
              <label className={styles["research-publications__field"]}>
                <span>Publication Date</span>
                <MonthInput
                  onChange={(event) =>
                    updateExistingPublication(
                      index,
                      "publicationDate",
                      event.target.value,
                    )
                  }
                  value={item.publicationDate}
                />
              </label>
              <label className={styles["research-publications__field"]}>
                <span>Link</span>
                <input
                  onChange={(event) =>
                    updateExistingPublication(index, "url", event.target.value)
                  }
                  type="url"
                  value={item.url}
                />
              </label>
            </div>

            <label className={styles["research-publications__summary"]}>
              <span>Summary</span>
              <textarea
                onChange={(event) =>
                  updateExistingPublication(index, "summary", event.target.value)
                }
                rows={4}
                value={item.summary}
              />
            </label>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
