import {memo, useState} from 'react'
import { Button, LargeTitle, Text, Title1, Title3, CompoundButton, TableColumnDefinition, createTableColumn, TableCellLayout, DataGridProps, DataGrid, DataGridHeaderCell, DataGridRow, DataGridCell, DataGridBody, DataGridHeader } from "@fluentui/react-components";
import { AddCircleFilled, AddSquareFilled, ArrowStepBackFilled, ArrowSyncFilled, CalendarClockFilled, CheckmarkFilled, ErrorCircleFilled, PaymentFilled } from "@fluentui/react-icons";
import {PaymentHistoryItem} from "../../interfaces/PaymentHistoryItem.tsx";

const getAction = (action: "topup" | "payment" | "added" | "return"): [JSX.Element, string] => {
    switch (action) {
        case "topup":
            return [<AddCircleFilled />, "Doładowanie salda"];
        case "payment":
            return [<PaymentFilled />, "Płatność"];
        case "added":
            return [<AddSquareFilled />, "Uznanie salda"];
        case "return":
            return [<ArrowStepBackFilled />, "Zwrot środków"];
    }
}

const columns: TableColumnDefinition<PaymentHistoryItem>[] = [
    createTableColumn<PaymentHistoryItem>({
        columnId: 'date',
        compare: (a, b) => {
            return a.date.getTime() - b.date.getTime();
        },
        renderHeaderCell: () => {
            return "Data"
        },
        renderCell: (item) => {
            return <TableCellLayout media={<CalendarClockFilled />}>
                {item.date.toTimeString()}
            </TableCellLayout>
        }
    }),
    createTableColumn<PaymentHistoryItem>({
        columnId: 'type',
        compare: (a, b) => {
            return a.type.localeCompare(b.type);
        },
        renderHeaderCell: () => {
            return "Typ zdarzenia"
        },
        renderCell: (item) => {
            const [icon, desc] = getAction(item.type);
            return <TableCellLayout media={icon}>
                {desc}
            </TableCellLayout>
        }
    }),
    createTableColumn<PaymentHistoryItem>({
        columnId: 'status',
        compare: (a,b) => {
            return a.type.localeCompare(b.type);
        },
        renderHeaderCell: () => {
            return "Status"
        },
        renderCell: (item) => {
            return <TableCellLayout media={item.status === "success" ? <CheckmarkFilled /> : <ErrorCircleFilled />}>
                {item.status === "success" ? "Sukces" : "Niepowodzenie"}
            </TableCellLayout>
        }
    }),
    createTableColumn<PaymentHistoryItem>({
        columnId: 'description',
        compare: (a,b) => {
            return a.type.localeCompare(b.type);
        },
        renderHeaderCell: () => {
            return "Szczegóły"
        },
        renderCell: (item) => {
            return <TableCellLayout>{item.description}</TableCellLayout>
        }
    })
]

const Payments = memo(function() {
    const [data, setData] = useState<PaymentHistoryItem[]>([]);
    const [sortState, setSortState] = useState<Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]>({
        sortColumn: "carId",
        sortDirection: "ascending",
    });

    const fetchData = () => {

    }

    const onSortChange: DataGridProps["onSortChange"] = (_e, nextSortState) => {
        setSortState(nextSortState);
    };

    return <>
        <section className={'tablePosition'}>
            <LargeTitle className={"marginsDef"}>Płatności</LargeTitle>
            <Button appearance="primary" icon={<ArrowSyncFilled />} onClick={fetchData}>Odśwież</Button>
        </section>
        <section className={'paymentMethods'}>
            <Title3>Metody płatności</Title3>
            <div className={'cardHolder'}>
                <div className={"balanceCard"}>
                    <Title1 align="center">15,68 zł</Title1>
                    <Text align="center" style={{marginBottom: '10px'}}>Dostępne środki</Text>
                    <Button icon={<AddCircleFilled/>} appearance="primary">Doładuj środki</Button>
                </div>
                <CompoundButton icon={<AddCircleFilled/>} size='large' className={'balanceCard'}>Dodaj kartę płatniczą</CompoundButton>
            </div>
        </section>
        <section className={'history'}>
            <Title3>Historia</Title3>
            <DataGrid items={data} columns={columns} sortable sortState={sortState} onSortChange={onSortChange}>
                <DataGridHeader>
                    <DataGridRow>
                        {({renderHeaderCell}) => (
                            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                        )}
                    </DataGridRow>
                </DataGridHeader>
                <DataGridBody<PaymentHistoryItem>>
                    {({item, rowId}) => (
                        <DataGridRow<PaymentHistoryItem> key={rowId}>
                            {({renderCell}) => (
                                <DataGridCell>{renderCell(item)}</DataGridCell>
                            )}
                        </DataGridRow>
                    )}
                </DataGridBody>
            </DataGrid>
        </section>
    </>
})

export default Payments
