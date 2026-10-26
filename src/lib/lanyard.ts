export type DiscordStatus = "online" | "idle" | "dnd" | "offline";

export type LanyardPresence = {
  status: DiscordStatus;
  username: string;
  activity?: string;
};

type LanyardResponse = {
  success: boolean;
  data?: {
    discord_status: DiscordStatus;
    discord_user?: { username?: string; global_name?: string };
    listening_to_spotify?: boolean;
    spotify?: { song?: string; artist?: string };
    activities?: { name?: string; type?: number; state?: string }[];
  };
};

export async function fetchLanyard(userId: string): Promise<LanyardPresence | null> {
  if (!userId || userId === "0") return null;

  const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
  if (!res.ok) return null;

  const json = (await res.json()) as LanyardResponse;
  if (!json.success || !json.data) return null;

  const { discord_status, discord_user, listening_to_spotify, spotify, activities } =
    json.data;

  let activity: string | undefined;
  if (listening_to_spotify && spotify?.song) {
    activity = `Listening to ${spotify.song}${spotify.artist ? ` — ${spotify.artist}` : ""}`;
  } else {
    const game = activities?.find((a) => a.type === 0 && a.name);
    if (game?.name) activity = `Playing ${game.name}`;
  }

  return {
    status: discord_status,
    username: discord_user?.global_name || discord_user?.username || "Discord",
    activity,
  };
}
