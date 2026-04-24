import { Badge } from "@/components/ui/badge";
import { Category } from "../../types";

interface CategoryBadgeProps {
  category: Category;
  className?: string;
  onClick?: () => void;
}

const CATEGORY_CONFIG: Record<Category, { label: string; className: string }> =
  {
    [Category.electronics]: {
      label: "Electronics",
      className: "bg-primary/10 text-primary border-primary/20",
    },
    [Category.clothing]: {
      label: "Clothing",
      className:
        "bg-secondary/30 text-secondary-foreground border-secondary/30",
    },
    [Category.books]: {
      label: "Books",
      className: "bg-chart-5/10 text-chart-5 border-chart-5/20",
    },
    [Category.home]: {
      label: "Home",
      className: "bg-accent/10 text-accent border-accent/20",
    },
    [Category.sports]: {
      label: "Sports",
      className: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    },
    [Category.digital]: {
      label: "Digital",
      className: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    },
    [Category.services]: {
      label: "Services",
      className: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    },
    [Category.other]: {
      label: "Other",
      className: "bg-muted text-muted-foreground border-border",
    },
  };

export function CategoryBadge({
  category,
  className = "",
  onClick,
}: CategoryBadgeProps) {
  const config = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG[Category.other];

  return (
    <Badge
      variant="outline"
      className={`text-xs font-medium ${config.className} ${className} ${onClick ? "cursor-pointer hover:opacity-80" : ""}`}
      onClick={onClick}
      data-ocid={`category.${category}.badge`}
    >
      {config.label}
    </Badge>
  );
}

// Category filter tabs
interface CategoryFilterProps {
  selected?: Category;
  onChange: (category: Category | undefined) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const categories = Object.values(Category);

  return (
    <fieldset className="flex flex-wrap gap-2 border-0 p-0 m-0">
      <legend className="sr-only">Filter by category</legend>
      <button
        type="button"
        onClick={() => onChange(undefined)}
        data-ocid="category.all.tab"
        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-fast ${
          !selected
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
        }`}
      >
        All
      </button>
      {categories.map((cat) => {
        const config = CATEGORY_CONFIG[cat];
        const isSelected = selected === cat;
        return (
          <button
            type="button"
            key={cat}
            onClick={() => onChange(isSelected ? undefined : cat)}
            data-ocid={`category.${cat}.tab`}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-fast ${
              isSelected
                ? `${config.className} border-current`
                : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {config.label}
          </button>
        );
      })}
    </fieldset>
  );
}
