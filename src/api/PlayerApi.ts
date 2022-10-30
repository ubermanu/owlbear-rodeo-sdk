import MessageBus from "../messages/MessageBus";
import { Metadata } from "../types/Metatdata";
import { Permissions } from "../types/Permissions";

class PlayerApi {
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
  }

  get id() {
    // Get the user id from the message bus which will be populated once OBR_READY is handled
    if (!this.messageBus.userId) {
      throw Error("Unable to get user ID: not ready");
    }
    return this.messageBus.userId;
  }

  async getSelection(): Promise<string[] | undefined> {
    const { selection } = await this.messageBus.sendAsync<{
      selection: string[] | undefined;
    }>("OBR_PLAYER_GET_SELECTION", {});
    return selection;
  }

  async select(items: string[], replace?: boolean): Promise<void> {
    await this.messageBus.sendAsync("OBR_PLAYER_SELECT", { items, replace });
  }

  async deselect(items: string[] | undefined): Promise<void> {
    await this.messageBus.sendAsync("OBR_PLAYER_DESELECt", { items });
  }

  async getName(): Promise<string> {
    const { name } = await this.messageBus.sendAsync<{ name: string }>(
      "OBR_PLAYER_GET_NAME",
      {},
    );
    return name;
  }

  async setName(name: string): Promise<void> {
    await this.messageBus.sendAsync("OBR_PLAYER_SET_NAME", { name });
  }

  async getColor(): Promise<string> {
    const { color } = await this.messageBus.sendAsync<{ color: string }>(
      "OBR_PLAYER_GET_COLOR",
      {},
    );
    return color;
  }

  async setColor(color: string): Promise<void> {
    await this.messageBus.sendAsync("OBR_PLAYER_SET_COLOR", { color });
  }

  async getSyncView(): Promise<boolean> {
    const { syncView } = await this.messageBus.sendAsync<{ syncView: boolean }>(
      "OBR_PLAYER_GET_SYNC_VIEW",
      {},
    );
    return syncView;
  }

  async setSyncView(syncView: boolean): Promise<void> {
    await this.messageBus.sendAsync("OBR_PLAYER_SET_SYNC_VIEW", { syncView });
  }

  async getId(): Promise<string> {
    const { id } = await this.messageBus.sendAsync<{ id: string }>(
      "OBR_PLAYER_GET_ID",
      {},
    );
    return id;
  }

  async getRole(): Promise<"GM" | "PLAYER"> {
    const { role } = await this.messageBus.sendAsync<{ role: "GM" | "PLAYER" }>(
      "OBR_PLAYER_GET_ROLE",
      {},
    );
    return role;
  }

  async getMetadata(): Promise<Metadata> {
    const { metadata } = await this.messageBus.sendAsync<{
      metadata: Metadata;
    }>("OBR_PLAYER_GET_METADATA", {});
    return metadata;
  }

  async setMetadata(update: Partial<Metadata>): Promise<void> {
    await this.messageBus.sendAsync("OBR_PLAYER_SET_METADATA", { update });
  }

  async getPermissions(): Promise<Permissions> {
    const { permissions } = await this.messageBus.sendAsync<{
      permissions: Permissions;
    }>("OBR_PLAYER_GET_PERMISSIONS", {});
    return permissions;
  }

  async getConnectionId(): Promise<string> {
    const { connectionId } = await this.messageBus.sendAsync<{
      connectionId: string;
    }>("OBR_PLAYER_GET_CONNECTION_ID", {});
    return connectionId;
  }
}

export default PlayerApi;
