import mongoose, { Schema, Document, Model } from "mongoose";

export interface INews extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  excerpt: string;
  content?: string;
  category: "Meeting" | "Maintenance" | "Event" | "Notice" | "General";
  important: boolean;
  published: boolean;
  publishedAt?: Date;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema = new Schema<INews>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      trim: true,
      minlength: [20, "Excerpt must be at least 20 characters"],
      maxlength: [800, "Excerpt cannot exceed 800 characters"],
    },
    content: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Meeting", "Maintenance", "Event", "Notice", "General"],
      default: "General",
    },
    important: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-set publishedAt when published
NewsSchema.pre("save", function (this: INews) {
  if (this.isModified("published") && this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

const News: Model<INews> =
  mongoose.models.News || mongoose.model<INews>("News", NewsSchema);

export default News;

