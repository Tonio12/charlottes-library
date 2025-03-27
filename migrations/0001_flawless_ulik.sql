CREATE TABLE "books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"genre" varchar(255) NOT NULL,
	"rating" integer DEFAULT 1 NOT NULL,
	"total_copies" integer NOT NULL,
	"available_copies" integer NOT NULL,
	"description" text NOT NULL,
	"cover_url" text NOT NULL,
	"cover_color" varchar(7) NOT NULL,
	"video_url" text NOT NULL,
	"summary" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "books_id_unique" UNIQUE("id")
);
