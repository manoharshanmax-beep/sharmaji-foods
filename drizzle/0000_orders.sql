CREATE TABLE bookings (id TEXT PRIMARY KEY, created INTEGER NOT NULL, actor TEXT NOT NULL, details TEXT NOT NULL, notification TEXT NOT NULL);
--> statement-breakpoint
CREATE INDEX bookings_actor_created ON bookings(actor,created);
