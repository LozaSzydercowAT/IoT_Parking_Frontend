import {memo, useEffect, useState} from 'react'
import {
    Button,
    createTableColumn,
    DataGrid, DataGridBody, DataGridCell, DataGridHeader, DataGridHeaderCell,
    DataGridProps, DataGridRow,
    LargeTitle,
    TableCellLayout,
    TableColumnDefinition
} from "@fluentui/react-components";
import HistoryItem from "../../interfaces/HistoryItem.tsx";
import {ArrowSyncFilled, CalendarClockFilled, MoneyFilled, VehicleCarProfileRegular} from "@fluentui/react-icons";
import CarItem from "../../interfaces/CarItem.tsx";

const columns: TableColumnDefinition<HistoryItem>[] = [
    createTableColumn<HistoryItem>({
        columnId: 'carId',
        compare: (a, b) => {
            return a.carId.localeCompare(b.carId);
        },
        renderHeaderCell: () => {
            return "Pojazd"
        },
        renderCell: (item) => {
            return <TableCellLayout media={<VehicleCarProfileRegular />}>
                {item.carId}
            </TableCellLayout>
        }
    }),
    createTableColumn<HistoryItem>({
        columnId: 'startParkingTime',
        compare: (a, b) => {
            return a.startParkingTime.getTime() - b.startParkingTime.getTime();
        },
        renderHeaderCell: () => {
            return "Czas rozpoczęcia"
        },
        renderCell: (item) => {
            return <TableCellLayout media={<CalendarClockFilled />}>
                {item.startParkingTime.toTimeString()}
            </TableCellLayout>
        }
    }),
    createTableColumn<HistoryItem>({
        columnId: 'endParkingTime',
        compare: (a, b) => {
            return a.endParkingTime.getTime() - b.endParkingTime.getTime();
        },
        renderHeaderCell: () => {
            return "Czas zakończenia"
        },
        renderCell: (item) => {
            return <TableCellLayout media={<CalendarClockFilled />}>
                {item.endParkingTime.toTimeString()}
            </TableCellLayout>
        }
    }),
    createTableColumn<HistoryItem>({
        columnId: 'fee',
        compare: (a, b) => {
            return a.fee - b.fee;
        },
        renderHeaderCell: () => {
            return "Opłata"
        },
        renderCell: (item) => {
            return <TableCellLayout media={<MoneyFilled />}>
                {item.fee} zł
            </TableCellLayout>
        }
    }),
]

const History = memo(function() {
    const [data, setData] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [sortState, setSortState] = useState<Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]>({
        sortColumn: "carId",
        sortDirection: "ascending",
    });

    const fetchData = () => {

    }

    useEffect(() => {
        fetchData();
    }, []);

    const onSortChange: DataGridProps["onSortChange"] = (_e, nextSortState) => {
        setSortState(nextSortState);
    };

    return <>
        <div className={'tablePosition'}>
            <LargeTitle>Historia</LargeTitle>
            <Button appearance="primary" icon={<ArrowSyncFilled />} onClick={fetchData}>Odśwież</Button>
        </div>
        <DataGrid items={data} columns={columns} sortable sortState={sortState} onSortChange={onSortChange}>
            <DataGridHeader>
                <DataGridRow>
                    {({renderHeaderCell}) => (
                        <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                    )}
                </DataGridRow>
            </DataGridHeader>
            <DataGridBody<CarItem>>
                {({item, rowId}) => (
                    <DataGridRow<CarItem> key={rowId}>
                        {({renderCell}) => (
                            <DataGridCell>{renderCell(item)}</DataGridCell>
                        )}
                    </DataGridRow>
                )}
            </DataGridBody>
        </DataGrid>
    </>
})

export default History
