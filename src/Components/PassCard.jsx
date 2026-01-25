import React from 'react'
import Logo from './Logo'

function PassCard({spotty}) {

  return (
        <div>

      {
        spotty &&   <widget type="ticket" class="--flex-column">
  <div class="top">
    <div class="content">
      <div class="emoji">🎉</div>
      <h1>Thank you!</h1>
      <p class="subtitle">Your ticket has been issued successfully</p>
      
      <div class="ticket-info">
        <div class="info-group">
          <label>TICKET ID</label>
          <p class="-bold">{spotty.pass_code}</p>
        </div>

        </div>
        {
          spotty?.items?.map((item) => 
          
            <div>
              <div class="info-group">
          <label>Price</label>
          <p class="-bold">{item.spots.price}</p>
        </div>
      

      <div class="info-group">
        <label>VENUE</label>
        <p class="-bold">{item.spots.title}</p>
      </div>

      

      <div class="info-group">
        <label>Location</label>
        <p class="-bold">{item.spots.location}</p>
      </div>

      <div class="info-group">
        <label>CITY</label>
        <p class="-bold">{item.spots.city}</p>
      </div>

      <div class="info-group">
        <label>Opening Time</label>
        <p class="-bold">{item.spots.opening_time}</p>
      </div>

      <div class="info-group">
        <label>Closing Time Time</label>
        <p class="-bold">{item.spots.closing_time}</p>
      </div>
            </div>
          
          )
        }

      
    </div>
  </div>

  <div class="rip"></div>

  <div class="bottom">
    <div class="barcode"></div>
    <div class="barcode-num">2 8937261 273610</div>
  </div>
</widget>
      }


    </div>
  )
}

export default PassCard