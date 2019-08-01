
interface CreepMemory { [key: string]: any }

interface ResourceWritable<T extends ResourceConstant = ResourceConstant> extends Resource {
	readonly prototype: Resource;

    /**
     * The writable amount of resource units containing.
     */
	writableAmount: number;
}

interface CreepsSpawnRule {
	roomName: string,
	spawnOrderMaxSpawnedCounts: { [key: string]: any }[],
	canControllerEnergizersBuild?: boolean,
	canEnergyCreepsHarvest?: boolean,
	canEnergyCreepsPickup?: boolean,
	canTransferersTransferToStorageOnly?: boolean,
	maxExtensionsPerEnergizer?: number,
	partsPerMove?: number,
	remoteRooms: RemoteRoomCreepsSpawnRule[],
}

interface RemoteRoomCreepsSpawnRule {
	roomName: string,
	spawnOrderMaxSpawnedCounts?: { [key: string]: any }[],
	canControllerEnergizersBuild?: boolean,
	canEnergyCreepsHarvest?: boolean,
	canEnergyCreepsPickup?: boolean,
	canTransferersTransferToStorageOnly?: boolean,
	energyTransferPercent?: number,
	maxExtensionsPerEnergizer?: number,
	partsPerMove?: number,
	roomStrategy?: string,
}