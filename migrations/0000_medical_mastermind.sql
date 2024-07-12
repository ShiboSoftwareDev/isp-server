CREATE TABLE `packages` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`price` integer NOT NULL,
	`speed` integer NOT NULL,
	`quota` integer NOT NULL,
	`durationDays` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`firstName` text NOT NULL,
	`username` text NOT NULL,
	`lastName` text,
	`address` text NOT NULL,
	`state` text,
	`country` text DEFAULT 'Libya' NOT NULL,
	`city` text NOT NULL,
	`expirationDate` integer DEFAULT '"2024-07-12T19:00:37.692Z"' NOT NULL,
	`email` text,
	`phone` integer NOT NULL,
	`balance` integer DEFAULT 0 NOT NULL,
	`quota` integer DEFAULT 0 NOT NULL,
	`packageId` integer,
	FOREIGN KEY (`packageId`) REFERENCES `packages`(`id`) ON UPDATE no action ON DELETE no action
);
