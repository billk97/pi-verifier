import api from '@/utils/api';

export default {

    getRequest() {
        return api({
            url: '/present-proof-2.0/records',
            method: 'GET'
        })
    },

    getRequestById(id) {
        return api({
            url: `/present-proof-2.0/records/${id}`,
            method: 'GET'
        })
    },

    delete(id) {
        return api({
            url: `/present-proof-2.0/records/${id}`,
            method: 'DELETE'
        })
    },

    sendRequest(id) {
        return api({
            url: `/present-proof-2.0/send-request`,
            method: 'POST',
            data: {
                comment: "To enter please show as the credentials",
                connection_id: id,
                presentation_request: {
                    dif: {
                        options: {
                            challenge: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            domain: "4jt78h47fh47"
                        },
                        presentation_definition: {
                            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            format: {
                                ldp_vp: {
                                    proof_type: [
                                    "BbsBlsSignature2020"
                                    ]
                                }
                            },
                            input_descriptors: [
                                {
                                    id: "employ_id_room_1",
                                    name: "Rooms credentials",
                                    schema: [
                                    {
                                        uri: "https://www.w3.org/2018/credentials#VerifiableCredential"
                                    },
                                    {
                                        uri: "https://api.alphacorp.vsk.gr/contexts/rooms/v1"
                                    },
                                    {
                                        uri: "https://api.alphacorp.vsk.gr/contexts/alphacorp-employee#jobTitle"
                                    }
                                    ],
                                    constraints: {
                                        is_holder: [
                                            {
                                            directive: "required",
                                            field_id: [
                                                "1f44d55f-f161-4938-a659-f8026467f126"
                                            ]
                                            }
                                        ],
                                        fields: [
                                            {
                                                id: "1f44d55f-f161-4938-a659-f8026467f126",
                                                path: [
                                                    "$.credentialSubject.givenName"
                                                ],
                                                purpose: "The claim must be from one of the specified issuers",
                                                predicate: "required",
                                                directive: "required",
                                                filter: {
                                                    type: "string",
                                                    const: "not-bill"
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                        }
                    }
            }
        })
    }
}