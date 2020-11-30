import React from 'react'

export default function Error() {
    return (
        <div>
            <div className="container p-3">
                <div className="card">
                    <div className="card">
                        <div className="card-header bg-danger text-white">
                            <h1 className="display-5">Error</h1>
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <p>Recurso no encontrado</p>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
