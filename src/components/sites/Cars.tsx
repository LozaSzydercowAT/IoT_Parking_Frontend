import {memo, useState, useEffect} from 'react'
import { Button, createTableColumn, DataGrid, DataGridBody, DataGridCell, DataGridHeader, DataGridHeaderCell, DataGridProps, DataGridRow, LargeTitle, TableCellLayout, TableColumnDefinition } from "@fluentui/react-components";
import '../../../axiosConfig.ts'
import CarItem from "../../interfaces/CarItem";
import axios from '../../../axiosConfig.ts'
import { ArrowSyncFilled, CalendarClockFilled, DeleteRegular, EditRegular, VehicleCarProfileRegular, VehicleCarRegular } from "@fluentui/react-icons";

const columns: TableColumnDefinition<CarItem>[] = [
    createTableColumn<CarItem>({
        columnId: 'carName',
        compare: (a, b) => {
            return a.carName.localeCompare(b.carName);
        },
        renderHeaderCell: () => {
            return "Nazwa pojazdu"
        },
        renderCell: (item) => {
            return <TableCellLayout media={<VehicleCarProfileRegular />}>
                {item.carName}
            </TableCellLayout>
        }
    }),
    createTableColumn<CarItem>({
        columnId: 'carModel',
        compare: (a, b) => {
            return a.carModel.localeCompare(b.carModel);
        },
        renderHeaderCell: () => {
            return "Model pojazdu"
        },
        renderCell: (item) => {
            return <TableCellLayout media={<VehicleCarRegular />}>
                {item.carModel}
            </TableCellLayout>
        }
    }),
    createTableColumn<CarItem>({
        columnId: 'licensePlate',
        compare: (a, b) => {
            return a.licensePlate.localeCompare(b.licensePlate);
        },
        renderHeaderCell: () => {
            return "Numer rejestracyjny"
        },
        renderCell: (item) => {
            return item.licensePlate
        }
    }),
    createTableColumn<CarItem>({
        columnId: 'lastParking',
        compare: (a, b) => {
            return a.lastParking.getTime() - b.lastParking.getTime();
        },
        renderHeaderCell: () => {
            return "Ostatnie parkowanie"
        },
        renderCell: (item) => {
            return <TableCellLayout media={<CalendarClockFilled />}>
                {item.lastParking.toDateString()}
            </TableCellLayout>
        }
    }),
    createTableColumn<CarItem>({
        columnId: 'actions',
        renderHeaderCell: () => {
            return "Akcje"
        },
        renderCell: () => {
            return (
                <>
                    <Button aria-label="Edytuj" icon={<EditRegular />} />
                    <Button aria-label="Usuń" icon={<DeleteRegular />} />
                </>
            );
        },
    })
]

const Cars = memo(function() {
    const [data, setData] = useState<CarItem[]>([{
        carName: 'Główny samochód',
        carModel: 'Ford Fiesta 2019',
        licensePlate: 'KBR 13488',
        lastParking: new Date(),
    }]);
    const [loading, setLoading] = useState(false);
    const [sortState, setSortState] = useState<Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]>({
        sortColumn: "file",
        sortDirection: "ascending",
    });

    const fetchData = () => {
        setLoading(true);
        axios.get('/data/cars')
            .then(response => setData(response.data))
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData();
    }, [])

    const onSortChange: DataGridProps["onSortChange"] = (_e, nextSortState) => {
        setSortState(nextSortState);
    };

    return <>
        <div className={'tablePosition'}>
            <LargeTitle>Samochody</LargeTitle>
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

export default Cars
