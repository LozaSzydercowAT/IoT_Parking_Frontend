import {Skeleton, SkeletonItem} from "@fluentui/react-components";
import '../../assets/styles/homepage.css'

function SpaceSkeleton() {
    const rows = Array.from({ length: 6 });
    const columns = Array.from({ length: 3});

    return (
        <div className="tableAlignment">
            {columns.map((_col, i) => (
                <div className="sectorAlignment" key={i}>
                    {rows.map((_row, j) => (
                        <Skeleton key={j} aria-label="Loading Content">
                            <SkeletonItem size={96}/>
                        </Skeleton>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default SpaceSkeleton
