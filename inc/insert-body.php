<?php
if (!function_exists('ai_post_generator_add_integration_code_body')){
    /**
     * Insert Code into HTML body
     *
     * @since  1.0.0
     * @author Kekotron
     */

    function ai_post_generator_add_integration_code_body() {
    	?>

    <div id="wp-body-content" class="container mt-5">
        <div class="wrap">
            <div class="progress my-3 p-0" style="border-radius: 10px;">
                <div class="progress-bar progress-bar-striped progress-bar-animated" id="progress-token" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%; border-radius:10px;"></div>
            </div>
            <div id="progress-n-tokens" class="mb-5 text-center" style="font-size: 1.3rem;"></div>
            <div id="payment-message" class="alert-success p-2  my-5 mx-2 hidden"></div>
            <ul class="nav nav-pills mb-3 justify-content-between" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                        aria-selected="true">Create</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-contact" type="button" role="tab"
                        aria-controls="pills-contact" aria-selected="false">Get tokens</button>
                </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <div class="container mt-4">
                        <div class="row">
                            
                            <h3 class="text-center mt-5 mb-2">New Post</h3>
                            <div class="form-group my-4">
                                <input class="form-control gpt3-title" type="text" name="title" id="title" placeholder="Title of Blog">
                            </div>
                            <div class="container">
                                <div class="my-4 d-flex align-items-center justify-content-center">
                                    <h4>Table of content</h4>
                                    <div class="ms-3"><svg onclick="table_of_content(this)" class="regpt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"/></svg> 
                                    </div>
                                </div>

                                <div class="treeview js-treeview">
                                    <ul class="ul-gpt3" id="ul-gpt3">
                                        <li>
                                            <div class="treeview__level" data-level="A" data-value="1">
                                                <div class="treeview__level-btns me-2">
                                                    <div class="btn btn-default btn-sm level-add"><span class="fa fa-plus"></span>
                                                        <div class="gpt3-buttons">
                                                            <div class="btn btn-default btn-sm level-same"><span class="fa fa-arrow-down"></span></div>
                                                            <div class="btn btn-default btn-sm level-sub"><span class="fa fa-arrow-right"></span></div>
                                                            <div class="btn btn-default btn-sm level-remove"><span class="fa fa-trash text-danger"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span class="level-title mx-2">1.</span>
                                                <input class="gpt3-input" type="text">
                                            </div>
                                            <ul class="ul-gpt3">
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                  
                                <template id="levelMarkup">
                                    <li>
                                        <div class="treeview__level" data-level="A">
                                            <div class="treeview__level-btns me-2">
                                                <div class="btn btn-default btn-sm level-add"><span class="fa fa-plus"></span>
                                                    <div class="gpt3-buttons">
                                                        <div class="btn btn-default btn-sm level-same"><span class="fa fa-arrow-down"></span></div>
                                                        <div class="btn btn-default btn-sm level-sub"><span class="fa fa-arrow-right"></span></div>
                                                        <div class="btn btn-default btn-sm level-remove"><span class="fa fa-trash text-danger"></span></div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <span class="level-title mx-2">Titulo</span>
                                            <input class="gpt3-input" type="text">
                                        </div>
                                        <ul class="ul-gpt3">
                                        </ul>
                                    </li>
                                </template>
                                <template id="levelMarksame">
                                        <div class="treeview__level" data-level="A">
                                            <div class="treeview__level-btns me-2">
                                                <div class="btn btn-default btn-sm level-add"><span class="fa fa-plus"></span>
                                                    <div class="gpt3-buttons">
                                                        <div class="btn btn-default btn-sm level-same"><span class="fa fa-arrow-down"></span></div>
                                                        <div class="btn btn-default btn-sm level-sub"><span class="fa fa-arrow-right"></span></div>
                                                        <div class="btn btn-default btn-sm level-remove"><span class="fa fa-trash text-danger"></span></div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <span class="level-title mx-2">Titulo</span>
                                            <input class="gpt3-input" type="text">
                                        </div>
                                        <ul class="ul-gpt3">
                                        </ul>
                                </template>
                                <div class="text-center my-5">
                                    <button class="btn btn-lg btn-primary w-auto" id="gpt3-button" onclick="gpt3()">Create</button>
                                    <div class="lds-dual-ring mt-5" id="loader"></div>
                                    <div class="gpt3-loading" id="gpt3-loading">
                                        <div class="gpt3-progress-circle"></div>
                                    </div>
                                    <div id="form-errors" class="mt-5" style="display: none;"></div>
                                </div>
                                <div id="response-gpt3" style="display:none">
                                    <div id="gpt3-text"></div>
                                    <div id="response-gpt3-buttons" class="d-flex my-5 justify-content-evenly">
                                        <svg onclick="gpt3()" class="regpt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"/></svg>
                                        <button class="btn btn-lg btn-success w-auto" id="gpt3-button" onclick="create_post('draft')">Draft</button>
                                        <button class="btn btn-lg btn-primary w-auto" id="gpt3-button" onclick="create_post('publish')">Publish</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                    <div class="d-flex flex-row align-items-center justify-content-evenly my-5">
                        <div class="d-flex flex-column">
                            <p class="my-2 res-text" id="n_tokens_text">10.000 tokens</p>
                            <p class="my-2 res-text" id="n_tokens_posts">10 posts aprox</p>
                        </div>
                        <input type="range" id="n_tokens" name="n_tokens" min="10000" value="10000" step="4000" max="200000">
                        <div id="price_text" class="res-text" style="font-size:2rem">5€</div>
                    </div>
                    <button class="btn btn-lg btn-primary" onclick="show_pay()">Update tokens</button>

                    <div id="pop-cont"></div>
                </div>
            </div>
        </div>
    </div>

    	<?php
    }
}
