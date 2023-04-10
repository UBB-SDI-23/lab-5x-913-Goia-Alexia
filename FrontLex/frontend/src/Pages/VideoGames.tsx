import React, { useEffect, useRef, useState } from 'react';
import CustomNavbar from "../Components/Navbar";
import Container from 'react-bootstrap/Container';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import GameTableRow from '../Components/GameTableRow';

interface Game {
    id: string,
    name: string,
    releaseYear: string,
    company: string,
    rating: string,
    sales: string,
    platform: string
}

export default function VideoGames() {
    const [data, setData] = useState([])
    const [selection, setSelection] = useState<Game | undefined>(undefined)

    const form = useRef(null)

    const fetchData = () => {
        fetch(process.env.REACT_APP_API_URL + "/videogames/")
            .then(response => response.json())
            .then(json => { setData(json) })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const select = (dt: any) => {
        console.log(dt)
        setSelection(dt)
    }

    const update = (e: any) => {
        e.preventDefault()
        console.log(selection)
        fetch(process.env.REACT_APP_API_URL + "/videogames/" + (selection!.id ? selection!.id + "/" : ""), {
            method: selection!.id ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selection),
        }).then(response => console.log(response))
            .then(() => { fetchData() })
    }

    const deleteGame = (id: any) => {
        if (id) {
            fetch(process.env.REACT_APP_API_URL + "/videogames/" + id + "/", {
                method: "DELETE"
            }).then(response => console.log(response))
                .then(() => { fetchData() })
        }
    }

    const clearSelection = () => {
        setSelection(undefined)
    }

    return (
        <>
            <CustomNavbar />
            <Container className="pt-5">
                {/* <p>{JSON.stringify(data)}</p> */}
                {/* [{"id":1,"name":"Pokemon Pearl","releaseYear":2016,"company":"Gamefreak","rating":3,"sales":3,"platform":1}] */}

                <h4 className='my-3'>Current selection: </h4>

                <Form className='my-3' ref={form}>
                    <Container>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formId">
                                    <Form.Label>Id:</Form.Label>
                                    <Form.Control value={selection ? selection!.id : ""} type="text" placeholder="" disabled readOnly />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-1" controlId="formName">
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control value={selection ? selection!.name : ""} onChange={e => setSelection({ ...selection!, name: e.target.value })} type="text" placeholder="" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-1" controlId="formReleaseYear">
                                    <Form.Label>Release Year:</Form.Label>
                                    <Form.Control value={selection ? selection!.releaseYear : ""} onChange={e => setSelection({ ...selection!, releaseYear: e.target.value })} type="text" placeholder="" />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-1" controlId="formCompany">
                                    <Form.Label>Company:</Form.Label>
                                    <Form.Control value={selection ? selection!.company : ""} onChange={e => setSelection({ ...selection!, company: e.target.value })} type="text" placeholder="" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-1" controlId="formRating">
                                    <Form.Label>Rating:</Form.Label>
                                    <Form.Control value={selection ? selection!.rating : ""} onChange={e => setSelection({ ...selection!, rating: e.target.value })} type="text" placeholder="" />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-1" controlId="formSales">
                                    <Form.Label>Sales:</Form.Label>
                                    <Form.Control value={selection ? selection!.sales : ""} onChange={e => setSelection({ ...selection!, sales: e.target.value })} type="text" placeholder="" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-1" controlId="formPlatform">
                                    <Form.Label>Platform Id:</Form.Label>
                                    <Form.Control value={selection ? selection!.platform : ""} onChange={e => setSelection({ ...selection!, platform: e.target.value })} type="text" placeholder="" />
                                </Form.Group>
                            </Col>

                            <Col></Col>
                        </Row>

                        <Row>
                            <Col>
                                <Button className="p-2 my-2 w-100 btn-danger" onClick={clearSelection}>Clear Selection</Button>
                            </Col>

                            <Col>
                                <Button type="submit" className="p-2 m-2 w-100" onClick={update}>Create/Update</Button>
                            </Col>
                            <Col></Col>
                            <Col></Col>
                            <Col></Col>
                            <Col></Col>
                            <Col></Col>
                            <Col></Col>
                        </Row>
                    </Container>
                </Form>



                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Release Year</th>
                            <th>Company</th>
                            <th>Rating</th>
                            <th>Sales</th>
                            <th>Platform</th>
                            <th>Bye Bye</th>
                        </tr>

                    </thead>
                    <tbody>
                        {data ? data.map((e: any) =>
                            <GameTableRow key={e.id} object={e} onClick={select} deleteGame={deleteGame} />
                        ) : null}
                    </tbody>
                </Table>
            </Container>

        </>
    );
}
