import { WatchedList } from "@/core/entities/watched-list";
import { CheckInFiles } from "./checkIn-file";

export class CheckInFileWatchedList extends WatchedList<CheckInFiles>{
    compareItems(a: CheckInFiles, b: CheckInFiles): boolean {
        return a.fileId === b.fileId
    }

}