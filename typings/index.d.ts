declare module 'birds' {
  
	import { ExecOptions } from 'child_process';

	import {
		BufferResolvable,
		CategoryChannel as DiscordCategoryChannel,
		Channel,
		Client,
		ClientApplication,
		ClientOptions,
		ClientUser,
		Collection,
		DMChannel as DiscordDMChannel,
		Emoji,
		EmojiResolvable,
		GroupDMChannel as DiscordGroupDMChannel,
		Guild as DiscordGuild,
		GuildChannel as DiscordGuildChannel,
		GuildEmoji,
		GuildMember,
		Message as DiscordMessage,
		MessageAttachment,
		MessageCollector,
		MessageEmbed,
		MessageOptions,
		MessageReaction,
		PermissionResolvable,
		Permissions,
		Presence,
		RateLimitData,
		ReactionCollector,
		Role,
		Snowflake,
		Speaking,
		StringResolvable,
		TextChannel as DiscordTextChannel,
		User as DiscordUser,
		UserResolvable,
		VoiceChannel as DiscordVoiceChannel,
		VoiceState,
		WebhookClient
  } from 'discord.js';

  export const version: string;

//#region Classes
  export class BirdsClient extends Client {
    public constructor(options?: BirdsClientOptions);
    public options: BirdsClientOptions;
    readonly roundedPing: number;

    public login(token?: string): Promise<string>;
  }

  export class Store {
    readonly self: Store;
  }

  export class Command {
    public constructor(options?: BirdsCommandOptions);
    public abstract run();
    public abstract hasPermission(member: GuildMember);
  }

  export class CommandStore {
    public constructor(path: string);
    readonly commands: object;
    private setCommand(file: string, reload: boolean);
  }

  export class LanguageStore {
    public constructor(path: string);
    private _language: object;
    readonly language: object;
  }

  export class Util {
    public static mergeObject(obj1: object, obj2: object): object;
    public static loadModule(path: string): any;
  }

//#region Errors
  export class IllegalStateError extends Error {
    public constructor(message?: string);
  }

//#region TypeDefs
  export type BirdsClientOptions = {
    language?: string;
    language_extension?: string;
    language_codes?: Array;
    prefix?: string;
    prefixCaseInsensitive?: boolean;
    ownerID?: string;
    typing?: boolean;
  } & ClientOptions;

  export type BirdsCommandOptions = {
    alias?: Array;
    args?: Array;
    permission?: number;
  }

  export type Contants = {
    DEFAULTS: {
      CLIENT: BirdsClientOptions;
    }
  }
}